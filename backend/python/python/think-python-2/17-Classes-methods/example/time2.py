class Time:
    """Represents the time of day

    attributes: hour, minute, second
    """
    def time_to_int(self):
        minutes = self.hour * 60 + self.minute
        seconds = minutes * 60 + self.second
        return seconds
