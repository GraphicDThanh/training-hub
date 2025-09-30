from nose2.tools import such

with such.A("File Reader:") as it:
    with it.having('filename'):
        @it.should('read file content')
        def test():
            pass

    it.createTests(globals())
