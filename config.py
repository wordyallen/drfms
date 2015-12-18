import os
from pymongo import MongoClient

WTF_CSRF_ENABLED = True
SECRET_KEY = 'Put your secret key here'
DB_NAME = 'demo'

DATABASE = MongoClient()[DB_NAME]
USERS_COLLECTION = DATABASE.users


DEBUG = True
