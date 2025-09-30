class FileReader():
    """Read File Class"""
    def __init__(self, filename):
        self.filename: str = filename
        with open(self.filename, "r") as fp:
            self.lines: [str, ...] = fp.read().split()
