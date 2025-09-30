### Collect and run coverage:
```bash
dotnet test --collect:"XPlat Code Coverage" --settings .runsettings
reportgenerator -reports:"xxx.cobertura.xml" -targetdir:"coveragereport" -reporttypes:Html


reportgenerator -reports:"/Users/thanhnguyen/Agility/Training/thanh.nguyendiem/dotnet-training/practice/StoreManagement/tests/UnitTests/TestResults/02e6d71e-abdd-4d6a-a1a2-67fdc5a39c86/coverage.opencover.xml" -targetdir:"coveragereport" -reporttypes:Html

```