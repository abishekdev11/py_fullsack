from django.urls import path
from .views import *
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
     path('home/',homepage),
     path('signin/',login_view),
     path('signup/',signup),
     path('product/',product),
     path('images/<str:id>/',images),
     path('items/<int:id>/',items),
     path('newproduct/',newproduct),
     path('newcategory/<int:id>/',newcategory),
     path('itemview/<str:id>/',itemview),
     path('itemview2/<str:id>/',itemview2),
     path('catitems/<str:id>/',catitems),
     path('employe/',employe),
     path('orderallocate/<int:orderid>/<int:empid>/',orderallocate),
     path('fetchorders/',fetchorders),
     path('orderedproduct/<int:id>/',orderedproduct),
     path('delivery/<int:id>/',delivery),
     path('addcart/<int:id>/',addcart),
     path('cartitems/<int:userid>/',cartitems),
     path('updatecart/<int:cartid>/<int:quantity>/',updatecart),


]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)