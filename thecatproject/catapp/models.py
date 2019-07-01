from django.db import models

class Description(models.Model):
    cats_descriptions = models.Manager()
    breed_id = models.CharField(max_length=4, primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
       return str(self.name)
    
class Image(models.Model):
    cats_pics = models.Manager()
    breed_id = models.ForeignKey('Description',
        on_delete=models.CASCADE,)
    img_url = models.URLField()

    def __str__(self):
        return str(self.breed_id)
