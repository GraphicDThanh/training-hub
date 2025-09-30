
# Store Management
This practice is building Web APIs for Store Management application.

## Perquisites
- .NET 8 SDK
- Docker
- docker-compose

## IDE
- VSCode

## Getting Started
### Setup secret variables
- Make a copy of `secrets.example.json` with name `secrets.json` then fill in your secret values
- Set secret values
  ```shell
  cd src/Api
  dotnet user-secrets init
  cat ./secrets.json | dotnet user-secrets set
  ```
### For production
- Build & up application
  ```shell
  docker-compose up
  ```
- Run with speficify .yml file
  ```bash
  docker-compose -f docker-compose.local.yml up
  ```
### For development
- Build & up application for development (only database with Docker container)
  - Run database (in `StoreManagement` directory)
    ```shell
    docker-compose up storedb
    ```
  - Run app (in `Api` directory)
    ```shell
    cd src/Api
    dotnet watch
    ```

### For testing
#### Run Test
- Unit test (`cd tests/UnitTests`)
- Integration test (`cd tests/IntegrationTests`)
- Run test
  ```shell
  dotnet test
  ```

#### Generate report

- Require .NET global tool `dotnet-reportgenerator-globaltool` if you want to generate coverage report (read more at [Unit Testing Coverage](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-code-coverage)):
  ```shell
  dotnet tool install -g dotnet-reportgenerator-globaltool
  ```
#### Auto
- Run `./coverage.sh` to generate report

#### Manual
- Collect test data use `coverlet`, the attachments will be saved in `TestResults` folder:
  ```shell
  dotnet test --collect:"XPlat Code Coverage"

  // run with setting
  dotnet test --collect:"XPlat Code Coverage" --settings ./.runsettings
  ```
- Generate report use `reportgenerator`:
  ```shell
  reportgenerator -reports:"absolute-path-to/TestResults/xxx/coverage.cobertura.xml" -targetdir:"coveragereport" -reporttypes:Html
  reportgenerator -reports:"/Users/thanhnguyen/Agility/Training/thanh.nguyendiem/dotnet-training/practice/StoreManagement/tests/UnitTests/TestResults/13737410-829e-45c3-a970-17dda159c88d/coverage.cobertura.xml" -targetdir:"coveragereport" -reporttypes:Html
  ```
- Access generated folder `coveragereport` and open `index.html` to view report

### Documents
- [Requirements](https://docs.google.com/document/d/12FIlK5OkflFydjzNx1qvQPF0IKKq4emDVZhi2cHRTkA/)
- [Diagrams](https://drive.google.com/file/d/1PAwfm59TeXoJguJCFnCb85MdcqGxxwNG/view?usp=sharing)
- [API Design](https://docs.google.com/document/d/16Kpywwh32hiT98sQPJSieWHc-EHHWtm66AqJhh1ODm0/edit?usp=sharing)
- [Convention](./documents/convention.md)
- [Others](./documents/general.md)
- [Commands List](./documents/commands.md)

## Authors
- Thanh Nguyen (thanh.nguyen@asnet.com.vn)