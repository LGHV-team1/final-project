from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Vod',
            fields=[

                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField(max_length=500, null=True)),
                ('bigcategory', models.CharField(default='기타', max_length=50)),
                ('smallcategory', models.CharField(default='기타', max_length=50)),
                ('category', models.CharField(max_length=50, null=True)),
                ('actors', models.CharField(max_length=100, null=True)),
                ('director', models.CharField(max_length=50, null=True)),
                ('imgpath', models.CharField(max_length=100, null=True)),
                ('name_no_space', models.CharField(default=None, editable=False, max_length=255)),

            ],
        ),
    ]
