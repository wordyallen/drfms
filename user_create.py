import os
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from server import bcrypt


def main():
    # Connect to the DB
    collection = MongoClient(os.environ['DRFMS_DB_1_PORT_27017_TCP_ADDR'])["demo"]["users"]

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
