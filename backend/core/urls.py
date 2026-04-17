from django.urls import path
from .views import ContactView, ChatBotView

urlpatterns = [
    path('contact/', ContactView.as_view(), name='contact'),
    path('chat/', ChatBotView.as_view(), name='chat'),
]
