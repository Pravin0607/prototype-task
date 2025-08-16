from rest_framework import generics, status, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .serializers import UserSerializer, UserProfileSerializer

class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        first_name = data.pop('first_name', None)
        last_name = data.pop('last_name', None)
        email = data.get('email')
        data['username'] = email  # Use email as username
        if 'password' in data:
            data['password'] = make_password(data['password'])
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # Create UserProfile with first_name and last_name
        if first_name and last_name:
            from .models import UserProfile
            UserProfile.objects.create(user=user, first_name=first_name, last_name=last_name)
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
