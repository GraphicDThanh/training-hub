## Practice with prompts, tests, output
### Prompts
- Case 1: Prompt from raw text
- Case 2: Prompt as JSON
- Case 3: Prompt from file
- Case 4: Multiple prompt from simple text file
  - `file://prompts/prompts.txt`
- Case 5: Prompts as markdown
- Case 6: Different prompts for models
- Case 7: Prompt functions
- Case 8: Prompt configs
- Case 9: Nunjucks filter
- Case 10: Default Prompt
### Tests
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