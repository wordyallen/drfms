import os
from pymongo import MongoClient

WTF_CSRF_ENABLED = True
SECRET_KEY = 'Put your secret key here'
DB_NAME = 'demo'

DATABASE = MongoClient(os.environ['DRFMS_DB_1_PORT_27017_TCP_ADDR'])[DB_NAME]
USERS_COLLECTION = DATABASE.users


DEBUG = True
