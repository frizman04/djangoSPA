# Generated by Django 2.2.4 on 2019-08-14 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('my_profile', models.CharField(max_length=255)),
                ('bloger_profile', models.CharField(max_length=255)),
                ('review', models.CharField(max_length=1000)),
                ('mark', models.IntegerField()),
            ],
        ),
    ]
