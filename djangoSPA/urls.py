
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from rest_framework import routers

from api.views import index, CommentAPIView, FilterAPIView

# router = routers.DefaultRouter()
# router.register(r'Сomment', CommentAPIView)


urlpatterns = [
    path('', index),

    # url(r'^', include(router.urls)),
    # path('admin/', admin.site.urls),

    url(r'Filter',FilterAPIView.as_view(), name='Filter'),
    url(r'Comment',CommentAPIView.as_view(), name='Comment'),
]
