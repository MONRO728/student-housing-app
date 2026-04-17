from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView, RegisterView, UserProfileView,
    AdminUserListView, ToggleBlockUserView, DeleteUserView, AdminResetPasswordView,
    ToggleSavePropertyView, SavedPropertiesView
)

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('me/', UserProfileView.as_view(), name='user_profile'),
    
    # Admin API
    path('admin/all-users/', AdminUserListView.as_view(), name='admin_all_users'),
    path('admin/toggle-block/<int:pk>/', ToggleBlockUserView.as_view(), name='admin_block_user'),
    path('admin/delete-user/<int:pk>/', DeleteUserView.as_view(), name='admin_delete_user'),
    path('admin/reset-password/<int:pk>/', AdminResetPasswordView.as_view(), name='admin_reset_password'),
    
    # Favorites API
    path('saved/', SavedPropertiesView.as_view(), name='saved_properties'),
    path('save-property/<int:prop_id>/', ToggleSavePropertyView.as_view(), name='save_property'),
]
