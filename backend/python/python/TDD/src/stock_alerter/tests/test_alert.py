import unittest
from datetime import datetime
from unittest import mock
import sys
from ..alert import Alert
from ..rule import PriceRule
from ..stock import Stock
from ..event import Event

class TestAction:
    executed = False

    def execute(self, description):
        self.executed = True

class AlertTest(unittest.TestCase):

    # @unittest.expectedFailure
    # def test_action_is_executed_when_rule_matches(self):
    #     goog = mock.MagicMock(spec=Stock)
    #     goog.updated = Event()
    #     goog.update.side_effect = lambda date, value: goog.updated.fire(self)

    #     exchange = {"GOOG": goog}

    #     rule = mock.MagicMock(spec=PriceRule)
    #     rule.matches.return_value = True
    #     rule.depends_on.return_value = {"GOOG"}

    #     action = mock.MagicMock()

    #     alert = Alert("sample alert", rule, action)
    #     alert.connect(exchange)
    #     exchange["GOOG"].update(datetime(2014, 2, 10), 11)
    #     action.execute.assert_called_with("sample alerts")

    def test_action_is_executed_when_rule_matches(self):
        goog = mock.MagicMock(spec=Stock)
        goog.updated = Event()
        goog.update.side_effect = lambda date, value: goog.updated.fire(self)

        exchange = {"GOOG": Stock("GOOG")}

        rule = mock.MagicMock(spec=PriceRule)
        rule.matches.return_value = True
        rule.depends_on.return_value = {"GOOG"}

        action = mock.MagicMock()

        alert = Alert("sample alert", rule, action)
        alert.connect(exchange)
        exchange["GOOG"].update(datetime(2014, 2, 10), 11)
        action.execute.assert_called_with("sample alert")

    def test_action_doesnt_fire_if_rule_doesnt_match(self):
        goog = Stock("GOOG")
        exchange = {"GOOG": goog}
        rule = PriceRule("GOOG", lambda stock: stock.price > 10)

        rule_spy = mock.MagicMock(wraps=rule)
        action = mock.MagicMock()

        alert = Alert("sample alert", rule_spy, action)

        alert.connect(exchange)
        alert.check_rule(goog)
        rule_spy.matches.assert_called_with(exchange)
        self.assertFalse(action.execute.called)

    def test_action_fires_when_rule_matches(self):
        goog = Stock("GOOG")
        exchange = {"GOOG": goog}

        main_mock = mock.MagicMock()
        rule = main_mock.rule
        rule.matches.return_value = True
        rule.depends_on.return_value = {"GOOG"}

        action = main_mock.action

        alert = Alert("sample alert", rule, action)
        alert.connect(exchange)

        goog.update(datetime(2014, 5, 14), 11)

        main_mock.assert_has_calls([
            mock.call.rule.matches(exchange),
            mock.call.action.execute("sample alert")
        ])

class AlertTestWindow(unittest.TestCase):
    def test_window_only(self):
        pass

@unittest.skipIf(sys.platform.startswith("win"), "skip on windows")
class AlertTestNotWindow(unittest.TestCase):
    def test_not_window_only(self):
        pass


# Run subset of test suite
## 2. Using test_loaders protocol
# do comment when run with nose2
def load_tests(loader, tests, pattern):
    suite = unittest.TestSuite()
    suite.addTest(loader.loadTestsFromTestCase(AlertTest))
    if sys.platform.startswith("win"):
        suite.addTest(
            loader.loadTestsFromTestCase(AlertTestWindow))
    return suite
