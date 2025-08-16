from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.models import User
from .models import UserProfile, Service, Task
from .serializers import UserProfileSerializer, ServiceSerializer, TaskSerializer, UserSerializer

from rest_framework import permissions

class ServiceViewSet(viewsets.ModelViewSet):
	queryset = Service.objects.all()
	serializer_class = ServiceSerializer
	permission_classes = [permissions.IsAuthenticated]
	
class IsOwnerOrAdmin(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		# Allow admin to do anything
		if request.user.is_staff:
			return True
		# Allow users to manage only their own profile
		return obj.user == request.user

class UserProfileViewSet(viewsets.ModelViewSet):
	queryset = UserProfile.objects.all()
	serializer_class = UserProfileSerializer
	permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

	def get_queryset(self):
		user = self.request.user
		if user.is_staff:
			return UserProfile.objects.all()
		# Only return the current user's profile for non-admins
		return UserProfile.objects.filter(user=user)

	def list(self, request, *args, **kwargs):
		queryset = self.get_queryset()
		if not request.user.is_staff:
			# For non-admins, only return their own profile
			instance = queryset.first()
			if instance:
				serializer = self.get_serializer(instance)
				return Response([serializer.data])
			return Response([])
		return super().list(request, *args, **kwargs)



class TaskViewSet(viewsets.ModelViewSet):
	queryset = Task.objects.all()
	serializer_class = TaskSerializer
	permission_classes = [permissions.IsAuthenticated]

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

