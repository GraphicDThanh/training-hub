# Commands
## Dotnet secrets
- Init dotnet secrets
    ```bash
    dotnet user-secrets init
    ```
- Set secret key value
    ```bash
    dotnet user-secrets set <key> <value>
    ```
- Clear all keys
    ```bash
    dotnet user-secrets clear
    ```

## Docker compose
- Up all containers
  ```bash
  docker-compose up
  ```
- Down all containers
  ```bash
  docker-compose down
  ```
- Rebuild all images
  ```bash
  docker-compose build
  ```
- Up one container
  ```bash
  docker-compose up <container-name>
  ```
- Down one container
  ```bash
  docker-compose down <container-name>
  ```

## EF Core
- Create migration
    ```bash
    dotnet ef migrations add <MigrationName>
    ```
- Apply migration
    ```bash
    dotnet ef database update
    ```
- Remove latest migration
    ```
    dotnet ef migrations remove
    ```
- Options: `--startup-project` or `-s` is path to the project that contains db context setup (Api app in this case). Example:
    ```bash
    dotnet ef migrations add <MigrationName> --startup-project <path-to-startup-project>
    dotnet ef migrations add <MigrationName> -s <path-to-startup-project>
    ```

## Dotnet Core
- Build project
    ```bash
    dotnet build
    ```
- Watch project
    ```bash
    dotnet watch
    ```
- Run project
    ```bash
    dotnet run
    ```
- Run test
    ```bash
    dotnet test
    ```
