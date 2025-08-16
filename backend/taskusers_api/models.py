
from django.db import models
from django.contrib.auth.models import User

class Service(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField(blank=True)

	def __str__(self):
		return self.name

class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
	first_name = models.CharField(max_length=30)
	last_name = models.CharField(max_length=30)

	def __str__(self):
		return f"{self.first_name} {self.last_name}"

class Task(models.Model):
	title = models.CharField(max_length=100)
	description = models.TextField(blank=True)
	is_completed = models.BooleanField(default=False)
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.title
