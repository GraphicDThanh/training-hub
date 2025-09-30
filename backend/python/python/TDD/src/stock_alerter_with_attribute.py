import unittest

class AttribLoader(unittest.TestLoader):
    def __init__(self, attrib):
        super().__init__()
        self.attrib = attrib

    # Have to override this because we have to override `load_tests` function if it present in code test as well
    def loadTestsFromModule(self, module, pattern=False):
        return super().loadTestsFromModule(module, pattern=pattern)

    def getTestCaseNames(self, testCaseClass):
        test_names = super().getTestCaseNames(testCaseClass)
        for test in test_names:
            print('attr', getattr(testCaseClass, test))
            print('condition', hasattr(getattr(testCaseClass, test), self.attrib))

        filtered_test_names = [test for test in test_names if hasattr(getattr(testCaseClass, test), self.attrib)]

        return filtered_test_names

if __name__ == "__main__":
    # unittest load just tests have attribute slow
    loader = AttribLoader("slow")
    test_suite = loader.discover(".")
    runner = unittest.TextTestRunner()
    runner.run(test_suite)
