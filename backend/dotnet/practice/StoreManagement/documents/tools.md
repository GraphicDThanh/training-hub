### Commands .NET CLI
- Create a solution
    `dotnet new sln -n StoreManagementPractice`
- Create a web api with controllers
    `dotnet new webapi --use-controllers -n StoreManagement.Api`
- EF commands
    - Require `--startup-project ../Api/StoreManagement.Api.csproj` to run from Api app
    - EF init migration files
        `dotnet ef migrations add Initial --startup-project ../Api/StoreManagement.Api.csproj`
    - Update migration to database
        `dotnet ef database update`
    - Remove clean all database with migrations
        `dotnet ef database update 0`
    - Update migration to database -> Run from app Api to have db context setup.
      - (concern: move setup db context to data access)

        `dotnet ef database update -s ../Api/`

### VSCode Extensions:
- [.NET Install Tool](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscode-dotnet-runtime)
- [vscode-solution-explorer](https://marketplace.visualstudio.com/items?itemName=fernandoescolar.vscode-solution-explorer)
    - Action in solution:
        - Create folder
        - Create project
        - Add existing project to solution
- [.NET Core Test Explorer](https://marketplace.visualstudio.com/items?itemName=formulahendry.dotnet-test-explorer)
- [.NET Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscode-dotnet-pack)

### Read more documents:
- [dotnet new <template>](https://learn.microsoft.com/en-us/dotnet/Domain/tools/dotnet-new-sdk-templates)
    - template: `webapi`
    - template args: `-controllers` or `--use-controllers`

