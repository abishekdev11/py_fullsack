from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  '__all__'
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user



class categorySerializer(serializers.ModelSerializer):
       class Meta:
        model = Categories
        fields = '__all__'


class imgserializer(serializers.Serializer):
    class Meta:
        model = Product
        fields = '__all__'



class itemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  

class newproductSerializer(serializers.ModelSerializer):
     class Meta:
        model = Product
        fields ='__all__'   
        
class employeSerializer(serializers.ModelSerializer):
    class Meta:
        model = employees
        fields ='__all__'
   
        

class orderSerializer(serializers.ModelSerializer):
    class Meta:
        model = orders
        fields ='__all__'
   
class cartSerializer(serializers.ModelSerializer):
    class Meta:
        model = cart 
        fields='__all__'

class cartItemSerializer(serializers.ModelSerializer):
    product_id = itemSerializer()
    class Meta:
        model = cart 
        fields='__all__'



