from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
import logging
import os
import google.generativeai as genai

logger = logging.getLogger(__name__)

class ContactView(APIView):
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')

        if not all([name, email, message]):
            return Response(
                {"error": "Barcha maydonlarni to'ldiring"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # 1. Send message to admin
            admin_subject = f"Yangi xabar: {name} ({email})"
            admin_message = f"Ism: {name}\nEmail: {email}\n\nXabar:\n{message}"
            
            send_mail(
                admin_subject,
                admin_message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_EMAIL],
                fail_silently=False,
            )

            # 2. Send "thank you" to user
            user_subject = "TalabaUy - So'rovingiz qabul qilindi"
            user_message = (
                "Assalomu alaykum!\n\n"
                "Sizning xabaringiz muvaffaqiyatli qabul qilindi. Tez orada siz bilan bog'lanamiz.\n\n"
                "TalabaUy platformasidan foydalanganingiz uchun rahmat!\n\n"
                "Hurmat bilan,\n"
                "TalabaUy jamoasi"
            )
            
            send_mail(
                user_subject,
                user_message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )

            return Response({"success": "Xabar yuborildi"}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Email yuborishda xatolik: {str(e)}")
            return Response(
                {"error": "Xabar yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

def search_properties(city_name: str = "", max_price_uzs: float = 0.0) -> list:
    """
    Foydalanuvchi so'roviga asosan tizimdagi bo'sh uylarni (ijaraga) qidirib topadi.
    Args:
        city_name: Qidirilayotgan shahar nomi (masalan: 'Toshkent', 'Samarqand').
        max_price_uzs: Bir oylik ijara narxining maksimal chegarasi (so'mda).
    Returns:
        Mos keluvchi uylar ro'yxati.
    """
    from listings.models import Property
    from django.db.models import Min
    
    qs = Property.objects.annotate(min_price=Min('rooms__price_per_month'))
    if city_name:
        qs = qs.filter(city__name__icontains=city_name)
    if max_price_uzs and max_price_uzs > 0:
        qs = qs.filter(min_price__lte=max_price_uzs)
        
    results = []
    for p in qs[:10]:
        results.append({
            "uy_nomi": p.name,
            "shahar": p.city.name if p.city else "",
            "manzil": p.address,
            "eng_arzon_xona_narxi_som": float(p.min_price) if p.min_price else 0,
            "yaqin_universitet": p.university.name if p.university else ""
        })
    return results

class ChatBotView(APIView):
    def post(self, request):
        message = request.data.get('message')
        if not message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return Response({"error": "API Key is missing"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        try:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel(
                "gemini-2.5-flash",
                tools=[search_properties],
                system_instruction=(
                    "Siz TalabaUy platformasining aqlli yordamchisisiz. "
                    "Foydalanuvchi uylar, narxlar yoki shaharlar haqida so'rasa, "
                    "albatta 'search_properties' asbobidan (tool) foydalanib bazadan qidiring. "
                    "Topilgan uylarni chiroyli ro'yxat qilib (o'zbek tilida) foydalanuvchiga taqdim eting. "
                    "Narxlarni so'mda o'qishli formatda yozing (masalan, 1 500 000 so'm)."
                )
            )
            chat = model.start_chat(enable_automatic_function_calling=True)
            response = chat.send_message(message)
            return Response({"reply": response.text}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Gemini API Error: {str(e)}")
            return Response(
                {"error": "Kechirasiz, hozir chatbot ishlamayapti. Keyinroq urinib ko‘ring."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
