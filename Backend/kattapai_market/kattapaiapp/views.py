from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from .serializers import *
from django.contrib.auth.models import User
from .models import *
import random



@api_view(['GET'])
def homepage(request):
    return Response("home page")


@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
          username = serializer.validated_data['username']
          password = serializer.validated_data['password']
          user = authenticate(username=username, password=password)
        
          if user:
              token, created = Token.objects.get_or_create(user=user)
              user_details = {
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email 
                }
              # user_data = user.objects.get(id=token.user)
              return Response({'token': token.key,'user_details': user_details}, status=status.HTTP_200_OK)                              
          return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def product(request):
        datas=Categories.objects.all()
        cat = categorySerializer(datas, many=True)
        return Response(cat.data)


@api_view(['PATCH'])
def images(request,id):
        img= request.FILES.get('image')
        if not img:
          return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)
        photo=Categories.objects.get(categoryname=id)
        photo.image=img
        photo.save()
        return Response(photo.image.url)

@api_view(['GET', 'DELETE', 'PATCH'])
def items(request,id):
  if request.method == 'GET':
    datas = Product.objects.all()
    item = itemSerializer(datas, many=True)
    return Response(item.data)
  elif request.method == 'DELETE':
      item = Product.objects.get(id=id)
      item.delete()
      return Response()
  elif request.method == 'PATCH':
      item = Product.objects.get(id=id) 
      serializer = newproductSerializer(item, data=request.data)
      if serializer.is_valid():
          serializer.save()
          return Response(serializer.data)
      else:
        return Response(serializer.errors, status=400)
  

     
@api_view(['POST'])
def newproduct(request):
    data = request.data.copy()
    category_name = data.get("category")
    category= Categories.objects.get(categoryname=category_name)
    data['category'] = category.id
    serializer = newproductSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
             
     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 

@api_view(['POST','GET', 'DELETE', 'PATCH'])
def newcategory(request,id):
    if request.method == 'POST':
     serializer = categorySerializer(data=request.data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
     else:      
      return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)    
    elif request.method == 'GET':
      datas = Categories.objects.all()
      item = categorySerializer(datas, many=True)
      return Response(item.data)
    elif request.method == 'DELETE':
      item = Categories.objects.get(id=id)
      item.delete()
      return Response()
    elif request.method == 'PATCH':
      item = Categories.objects.get(id=id) 
      serializer = categorySerializer(item, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
      else:
        return Response(serializer.errors, status=400)

@api_view(['GET'])
def itemview(request, id):
    try:
        item = Product.objects.get(name=id)
        serializer = newproductSerializer(item)
        return Response(serializer.data)
    except:
        try:
            category = Categories.objects.get(categoryname=id)
            products = Product.objects.filter(category=category.id)
            serializer = newproductSerializer(products, many=True)
            return Response(serializer.data)
        except:
            return Response(
                {"error": "No matching Product or Category found"},
                status=status.HTTP_404_NOT_FOUND
            )

@api_view(['GET'])
def itemview2(request,id):
    if id.isnumeric(): 
     item = list(Product.objects.filter(category=id))
    else:
      category = Categories.objects.get(categoryname=id)
      item = list(Product.objects.filter(category=category.id) )
    random.shuffle(item)
    serializer = newproductSerializer(item,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def catitems(request,id):
     category = Categories.objects.get(categoryname=id)
     catid = category.id
     items =list(Product.objects.filter(category=catid))
     random.shuffle(items)
     serializer = newproductSerializer(items,many=True)
     return Response(serializer.data)


@api_view(['GET'])
def employe(request):
   emp = employees.objects.all()
   serializer = employeSerializer(emp,many=True)
   
   a=[]
   return Response(serializer.data)

@api_view(['POST'])
def orderallocate(request,orderid,empid):
   emp = employees.objects.get(id=empid)
   order = orders.objects.get(id=orderid)
   emp.order = orderid
   emp.status = 'active'
   emp.save()
   order.status = 'pending'
   order.save()
   return Response('order assigned')

@api_view(['GET'])
def orderedproduct(request,id):
   product = Product.objects.get(id=id)
   item = itemSerializer(product)
   return Response(item.data)

@api_view(['GET'])
def fetchorders(request):
   order = orders.objects.all()
   serializer = orderSerializer(order,many=True)
   return Response(serializer.data)

@api_view(['PATCH'])
def delivery(request,id):
   order = orders.objects.get(id=id)
   order.status= 'delivered'
   order.save()
   return Response("Item marked as delivered")
   
@api_view(['POST','DELETE']) 
def addcart(request,id):
  if request.method == 'POST':
    product_id = request.data.get('product_id')
    user = request.data.get('user_id')
    exist_item = cart.objects.filter(user_id = user,product_id = product_id).first()
    if exist_item:
     return Response('item already added to cart')
    else:
     serializer = cartSerializer(data=request.data)
     if serializer.is_valid():
       serializer.save() 
     return Response('item added to cart')
  elif request.method == 'DELETE':
     cartitem = cart.objects.get(id=id)
     cartitem.delete()
     return Response('item removed')
   
@api_view(['GET'])
def cartitems(request,userid):
   cartitems = cart.objects.filter(user_id=userid)
   cartserializer = cartItemSerializer(cartitems,many=True)
   return Response(cartserializer.data) 

@api_view(['PATCH'])
def updatecart(request,cartid,quantity):
   cartitems = cart.objects.get(id=cartid)  
   cartitems.quantity = quantity
   cartitems.save() 
   return Response("item quantity updated")   
    

            


    
# Create your views here.