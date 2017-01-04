import os
from pymongo import MongoClient

WTF_CSRF_ENABLED = True
SECRET_KEY = 'Put your secret key here'
DB_NAME = 'demo'


DATABASE = MongoClient("ds151028.mlab.com", 51028)["drfms"]
DATABASE.authenticate("wordyallen", "hegemony1")
USERS_COLLECTION = DATABASE.users


DEBUG = True
