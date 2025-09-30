from pprint import pprint
import sys

def print_locals():
    caller = sys._getframe(1)
    pprint(caller.f_locals)

# To use it run: PYTHONBREAKPOINT=bp_utils.print_locals python3 bugs.py
