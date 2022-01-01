from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from app import bcrypt
import os


def main():
    # Connect to the DB
    connection = MongoClient(os.getenv("DB_URL"), 27017)
    db = connection["drfms"]
    collection = db['users']

    # Ask for data to store
    user = raw_input("Enter your username: ")
    password = raw_input("Enter your password: ")
    pass_hash = bcrypt.generate_password_hash(password)

    # Insert the user in the DB
    try:
        collection.insert({"_id": user, "password": pass_hash})
        print "User created."
    except DuplicateKeyError:
        print "User already present in DB."


if __name__ == '__main__':
    main()
