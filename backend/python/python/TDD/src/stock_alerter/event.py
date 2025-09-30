class Event:
    """A generic class that provides signal/slot functionality"""
    def __init__(self):
        self.listeners = []

    def connect(self, listeners):
        self.listeners.append(listeners)

    def fire(self, *args, **kwargs):
        for listener in self.listeners:
            listener(*args, **kwargs)
