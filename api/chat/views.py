from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.responses import Response
from rest_framework.view import APIView
# Create your views here.

class SignInView(APIView):
    permission_classess = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response(status=400)
