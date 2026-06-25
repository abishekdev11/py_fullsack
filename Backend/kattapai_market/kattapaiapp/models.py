from django.db import models
from django.contrib.auth.models import AbstractUser


class Categories(models.Model):
    categoryname = models.CharField(max_length=50, unique=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)


class Product(models.Model):
    name = models.CharField(max_length=50, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='images/', unique=True, blank=True, null=True)
    offer = models.CharField(max_length=10, blank=True, null=True)
    category = models.ForeignKey(Categories, related_name='products', on_delete=models.CASCADE)

class cart(models.Model):
    user_id = models.CharField(max_length=100)
    product_id =models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)


class employees(models.Model):
    emp_name = models.CharField(max_length=50)
    mobile = models.CharField(max_length=15,unique=True)
    order = models.CharField(max_length=100,blank=True, null=True)
    status =  models.CharField(max_length=50,blank=True, null=True)

class orders(models.Model):
    user_id = models.CharField(max_length=100)
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15)
    product_id = models.ForeignKey(Product, related_name='item',on_delete=models.CASCADE)
    status =  models.CharField(max_length=50) 

    
class customer(models.Model):
    name = models.CharField(max_length=50)
    mobile = models.CharField(max_length=15,unique=True)
    address = models.CharField(max_length=100,blank=True, null=True)

# kattapai_market


