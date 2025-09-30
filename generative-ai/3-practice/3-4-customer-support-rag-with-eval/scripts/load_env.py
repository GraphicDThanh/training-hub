import os
from dotenv import find_dotenv, load_dotenv

# Load the .env file
load_dotenv(find_dotenv(), override=True)

print(f"Test load value of RETRIEVER_K: {os.getenv('RETRIEVER_K')}")
print("Success load .env file!")

