from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import CustomTokenObtainPairSerializer, UserRegistrationSerializer, UserSerializer
import secrets
import string

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserRegistrationSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

class AdminUserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)

class ToggleBlockUserView(generics.GenericAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.IsAdminUser,)
    
    def post(self, request, pk, *args, **kwargs):
        user = self.get_object()
        user.is_active = not user.is_active
        user.save()
        return Response({"status": "blocked" if not user.is_active else "unblocked", "user_id": user.id})

class DeleteUserView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)

class AdminResetPasswordView(generics.GenericAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.IsAdminUser,)

    def post(self, request, pk, *args, **kwargs):
        user = self.get_object()
        provided_password = request.data.get('new_password')
        
        if provided_password:
            new_password = provided_password
            message = "Yangi parol muvaffaqiyatli saqlandi."
            is_temp = False
        else:
            alphabet = string.ascii_letters + string.digits
            new_password = ''.join(secrets.choice(alphabet) for _ in range(12))
            message = "Vaqtinchalik parol yaratildi."
            is_temp = True
            
        user.set_password(new_password)
        user.save()
        
        return Response({
            "message": message,
            "new_password": new_password if is_temp else None,
            "is_temp": is_temp,
            "username": user.username
        })

from listings.models import Property
class ToggleSavePropertyView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, prop_id, *args, **kwargs):
        user = request.user
        try:
            prop = Property.objects.get(id=prop_id)
            if prop in user.saved_properties.all():
                user.saved_properties.remove(prop)
                return Response({"status": "removed"})
            else:
                user.saved_properties.add(prop)
                return Response({"status": "added"})
        except Property.DoesNotExist:
            return Response({"error": "Uy topilmadi"}, status=status.HTTP_404_NOT_FOUND)

class SavedPropertiesView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    # We will use Property serializer later from listings
    
    def get(self, request, *args, **kwargs):
        from listings.serializers import PropertyListSerializer
        saved = request.user.saved_properties.all()
        serializer = PropertyListSerializer(saved, many=True, context={'request': request})
        return Response(serializer.data)
