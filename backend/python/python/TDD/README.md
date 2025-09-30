# TDD practice
1. Stock alerter

> Example code from book **Test Driven Development Python**
> Support nose2 with nose2.cfg
2. Practice TDD with **Thinking Python** book's practice

> Note:
>     * If run with nose2, pls comment function load_tests in file test_alert.py
>     * If run with unittest, pls comment code of nose2 in folder tests/nose2

### Run test command at **src** folder
#### Run all tests
* Run all tests with `unittest`(auto discover by default)

    ```
        python3 -m unittest
    ```

* Run only specific test

    ```
        python3 -m unittest stock_alerter.tests.test_stock
    ```

* Run only specific method/class from specific test file

    ```
        python3 -m unittest stock_alerter.tests.test_stock.StockTest
    ```

* run doctest and showing detail content

    ```
        python3 -m stock_alerter.stock -v
    ```

* run tests  with `nose2`(auto load plugin on file nose2.cfg)

    ```
        nose2
    ```

* run test nose2 with specific plugin layer and showing layer report

    ```
        nose2 --plugin nose2.plugins.layers --layer-reporter -v
    ```

* run test nose2 with coverage

    ```
        nose2 --with-coverage
    ```

* run all test with coverage, layers plugin and report detail

    ```
        nose2 --with-coverage --layer-reporter -v
    ```

* get HTML output

    ```
        nose2 --with-coverage --coverage-report html
    ```

* combine all coverage report: html, coverage, term

    ```
        nose2 --with-coverage --coverage-report html --coverage-report term
    ```

#### Run subset of test

* Run some test from test_stock only

    ```
        python3 stock_alerter_only_stock.py
    ```

* Run some test base on attributes

    ```
        python3 stock_alert_with_attribute.py
    ```

* Run test for practice with `Thinking Python`(unittest))

    ```
        python3 run_practice_test.py
    ```

#### Run practice with Thinking Python's exercise
```
    cd thinking_python_practice
```

* Run app:
```
    python3 main.py
```

* Run test:
```
    nose2 --layer-reporter -v
```

