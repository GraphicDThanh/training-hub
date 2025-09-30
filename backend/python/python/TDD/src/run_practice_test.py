import unittest
from thinking_python_practice_old.tests import test_practice

if __name__ == "__main__":
    runner = unittest.TextTestRunner()
    runner.run(test_practice.suite())
