# Python 3.6
# Try with: https://python-forum.io/Thread-Async-for-loop
import asyncio

class Aiter:
    def __init__(self, iterable):
        self.iter_ = iter(iterable)

    async def __aiter__(self):
        return self

    async def __anext__(self):
        await asyncio.sleep(0)
        try:
            object = next(self.iter_)
        except StopIteration:
            raise StopAsyncIteration # :-) PEP492 - "To stop iteration __anext__ must raise a StopAsyncIteration exception"

        return object

async def foo(text):
    await asyncio.sleep(0) # this is needed in order to made it coroutine function
    async for char in Aiter('So Long, and Thanks for All the Fish'):
        print(char)

def main():
    text = 'So Long, and Thanks for All the Fish'
    loop = asyncio.get_event_loop()
    task = loop.create_task(foo(text))
    loop.run_until_complete(task)

if __name__ == '__main__':
    # It still not work as my expectation :()
    main()
# PEP 530 - Asynchronous Comprehensions
# result = [i async for i in aiter() if i % 2]

# PEP 525 - Asynchronous Generators
# async def ticker(delay, to):
#     """Yield number from 0 to *to* every *delay* seconds"""
#     for i in range(to):
#         yield i
#         await asyncio.sleep(delay)
