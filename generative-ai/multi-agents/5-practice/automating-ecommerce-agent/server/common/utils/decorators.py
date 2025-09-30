def model_config_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Calling function: {func.__name__} with arguments: {args}, {kwargs}")
        result = func(*args, **kwargs)
        print(f"Finished function: {func.__name__} with result: {result}")
        return result
    return wrapper
