from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields[self.username_field] = serializers.CharField(required=False)
        self.fields['email'] = serializers.EmailField(required=False)

    def validate(self, attrs):
        username = attrs.get(self.username_field)
        email = attrs.get('email')

        if not username and email:
            user = User.objects.filter(email=email).first()
            if user:
                attrs[self.username_field] = user.username
            else:
                raise serializers.ValidationError("Ushbu email bilan foydalanuvchi topilmadi.")
        
        # Remove custom email field so default authenticate backend doesn't crash
        if 'email' in attrs:
            del attrs['email']

        # Ensure username is present before calling super().validate
        if not attrs.get(self.username_field):
             raise serializers.ValidationError("Login yoki email kiritish majburiy.")

        return super().validate(attrs)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['role'] = user.role
        return token

class UserSerializer(serializers.ModelSerializer):
    saved_properties = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role', 'phone_number', 'avatar', 'saved_properties', 'is_staff', 'is_active')

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'role', 'phone_number')
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data.get('role', 'TALABA'),
            phone_number=validated_data.get('phone_number', '')
        )
        return user
