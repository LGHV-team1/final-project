# Generated by Django 4.2.6 on 2023-12-18 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Vod',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField(max_length=500, null=True)),
                ('bigcategory', models.CharField(default='기타', max_length=50)),
                ('smallcategory', models.CharField(default='기타', max_length=50)),
                ('category', models.CharField(max_length=50, null=True)),
                ('searchactors', models.CharField(max_length=200, null=True)),
                ('actors', models.JSONField(max_length=200, null=True)),
                ('director', models.CharField(max_length=50, null=True)),
                ('runningtime', models.CharField(max_length=10, null=True)),
                ('imgpath', models.CharField(max_length=100, null=True)),
                ('name_no_space', models.CharField(editable=False, max_length=255)),
                ('backgroundimgpath', models.CharField(max_length=100, null=True)),
                ('count', models.IntegerField(null=True)),
                ('choseong', models.CharField(max_length=255, null=True)),
            ],
        ),
    ]
