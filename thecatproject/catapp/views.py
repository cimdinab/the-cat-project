from django.shortcuts import render, render_to_response
from .models import Description, Image
from django.http import JsonResponse

# Create your views here.
def index(request):
    return render_to_response('index.html')


def save_desc(request):
        if request.method == 'POST':
                new_cat_desc = Description()
                new_cat_desc.breed_id = request.POST['breed_id']
                new_cat_desc.name = request.POST['name']
                new_cat_desc.description = request.POST['description']
                new_cat_desc.save()
                return JsonResponse({})

def save_img(request):
        if request.method == 'POST':
                cat_id = request.POST['breed_id']
                cat_url = request.POST['img_url']
                try:
                        new_cat_img = Image(img_url=cat_url, breed_id=Description(cat_id))
                        new_cat_img.save()
                except:
                        save_desc(request)
                        new_cat_img = Image(img_url=cat_url, breed_id=Description(cat_id))
                        new_cat_img.save()
                return JsonResponse({})

