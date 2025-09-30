# import os, sys

# from os.path import dirname, join, abspath
# sys.path.insert(0, abspath(join(dirname(__file__), '..')))
from src.word import playWithWord
from src.book import playWithBook

# Define root for project
# All code run put here to make sure the path work properly for both code run and test
if __name__ == '__main__':
    playWithWord()
    playWithBook()

