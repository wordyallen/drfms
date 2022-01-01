import os
from pymongo import MongoClient

WTF_CSRF_ENABLED = True
SECRET_KEY = 'Put your secret key here'
DB_NAME = 'demo'

DATABASE = MongoClient(os.getenv('DB_URL'), 27017)["drfms"]
USERS_COLLECTION = DATABASE.users


DEBUG = True
