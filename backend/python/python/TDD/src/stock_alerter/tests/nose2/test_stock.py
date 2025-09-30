# do comment when run test with unittest
from datetime import datetime
from stock_alerter.stock import Stock
from nose2.tools.params import params
from nose2.tools import such


# do example with setup and teardown in nose2
def setup_test():
    global goog
    goog = Stock("GOOG")

def teardown_test():
    global goog
    goog = None

def test_price_of_a_new_stock_class_should_be_None():
    assert goog.price is None, "Price of a new stock should be None"


test_price_of_a_new_stock_class_should_be_None.setup = setup_test
test_price_of_a_new_stock_class_should_be_None.teardown = teardown_test

# using parameter from nose2
def given_a_series_of_prices(stock, prices):
    timestamps = [datetime(2014, 2, 10), datetime(2014, 2, 11), datetime(2014, 2, 12), datetime(2014, 2, 13)]

    for timestamp, price in zip(timestamps, prices):
        stock.update(timestamp, price)

@params(
    ([8, 10, 12], True),
    ([8, 10, 0], False),
    ([8, 10, 10], False),
)
def test_stock_trends(prices, expected_output):
    goog = Stock("GOOG")
    given_a_series_of_prices(goog, prices)
    assert goog.is_increasing_trend() == expected_output

# example about generate tests
def test_trend_with_all_consecutive_value_upto_100():
    for i in range(100):
        yield stock_trends_with_consecutive_prices, [i, i+1, i+2]

def test_trend_with_all_not_consecutive_value_upto_100():
    for i in range(1, 100):
        yield stock_trends_with_not_consecutive_prices, [i, i+1, i+1]

def stock_trends_with_consecutive_prices(prices):
    goog = Stock("GOOG")
    given_a_series_of_prices(goog, prices)
    assert goog.is_increasing_trend()

def stock_trends_with_not_consecutive_prices(prices):
    goog = Stock("GOOG")
    given_a_series_of_prices(goog, prices)
    assert goog.is_increasing_trend() is False

# example with layers in nose2
# create topmost layer
with such.A("Stock class") as it:

    @it.has_setup
    def setup():
        it.goog = Stock("GOOG")

    # it.having used as context manager to create a sub-layer
    with it.having("a price method"):
        # mark setup function for a layer
        @it.has_setup
        def setup():
            it.goog.update(datetime(2014, 2, 12), price=10)

        # decorator to mark a test case
        @it.should("return the price")
        def test(case):
            assert it.goog.price == 10

        @it.should("return the lastest price")
        def test(case):
            it.goog.update(datetime(2014, 2, 11), price=15)
            assert it.goog.price == 10

    with it.having("a trend method"):
        @it.should("return True if last three updates were increasing")
        def test(case):
            it.goog.update(datetime(2014, 2, 11), price=12)
            it.goog.update(datetime(2014, 2, 12), price=13)
            it.goog.update(datetime(2014, 2, 13), price=14)
            assert it.goog.is_increasing_trend()

# convert all the Layers code into test cases
it.createTests(globals())

# have to run this code with `nose2 --plugin nose2.plugins.layers --layer-reporter -v` because it use layers plugin
