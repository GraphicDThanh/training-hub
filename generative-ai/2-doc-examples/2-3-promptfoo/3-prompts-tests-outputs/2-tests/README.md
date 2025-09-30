## Practice with tests

- Case 1: One test file `file://tests/tests.yaml`
```
tests:
  - file://tests/tests.yaml
```

- Case 2: Multiple CSV files
```
tests:
  - file://tests/test_translate_to_french.csv
  - file://tests/test_translate_to_german.csv
  - file://tests/test_translate_to_spanish.csv
```