# Python 3.7
def divide(e, f):
    breakpoint(e, f, end='<-END\n')
    return f / e

a, b = 0, 1
print(divide(a, b))

# Run without breakpoint with
# PYTHONBREAKPOINT=0 python3 breakpoints.py

# Run breakpoint with arg with:
# PYTHONBREAKPOINT=print python3 bugs.py
