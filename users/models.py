from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
	name = models.CharField(max_length=255)
	email = models.EmailField(unique=True)
	is_active = models.BooleanField(default=False)
	profile_img = models.ImageField(upload_to="profile_images/", null=True, blank=True)
	created_at = models.DateTimeField(default=timezone.now)
	updated_at = models.DateTimeField(auto_now=True)
	registration_source = models.CharField(max_length=255)
	is_superuser = models.BooleanField(default=False)
	is_staff = models.BooleanField(default=False)
	objects = CustomUserManager()

	USERNAME_FIELD = "email"
	REQUIRED_FIELDS = ["name", "registration_source"]

	def __str__(self):
		return self.email
