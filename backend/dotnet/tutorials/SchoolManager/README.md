## [EF Core Tutorial](https://www.entityframeworktutorial.net/efcore/entity-framework-core.aspx)

### Environment:
- VSCode with MacOS

### Guides
- [EF Core Tutorial](https://www.entityframeworktutorial.net/efcore/entity-framework-core.aspx)
- [SQL Server for Mac](https://stefried.medium.com/entity-framework-core-and-sql-server-on-mac-d088e6427e35)
- VSCode Extensions
    - Docker
    - SQL Server (mssql)

### Guides
#### Packages
- Add package ef core sql server: 
```bash
dotnet add package microsoft.EntityCoreFramework.SqlServer
dotnet add package microsoft.EntityCoreFramework.SqlServer.Design
```
- Add package for configuration with `appsettings.json`
```bash
dotnet add package Microsoft.Extensions.Configuration
dotnet add package Microsoft.Extensions.Configuration.Json
```
- Add package for EF Core migrations
```bash
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

### Server
- Run SQL Server on MacOS
    - Install SQL Server on Linux:
    ```bash
    docker pull mcr.microsoft.com/azure-sql-edge
    ```
    - Run container of this image:
    ```bash
    docker run -e "ACCEPT_EULA=1" -e "MSSQL_SA_PASSWORD=1StrongPassword@" -e "MSSQL_PID=Developer" -e "MSSQL_USER=SA" -p 1433:1433 -d --name=sql mcr.microsoft.com/azure-sql-edge
    ```
    - Open "Docker" tab in VS Code and make sure container run with green start icon
    - Open "SQL Server" Tab and add connection with:
        - Servername: `localhost`
        - Database name: 
        - Select "SQL Login"
        - Username: `sa`
        - Password: `1StrongPassword@`

    - Issue on Mac M1 with MSSQL cannot start container with `mcr.microsoft.com/mssql/server:2022-latest`
        - Solution: replace by `mcr.microsoft.com/azure-sql-edge`
        - [Github Issue](https://github.com/microsoft/mssql-docker/issues/668)
        - Guide [MySQL on Mac](https://devblogs.microsoft.com/azure-sql/development-with-sql-in-containers-on-macos/)


#### Migrations
- Add migration file:
```bash
dotnet ef migrations add InitialSchoolDB
```
- List all migrations
```bash
dotnet ef migrations list
```
- Remove last migration
```bash
dotnet ef migrations remove
```
- Apply migrations to database
```bash
dotnet ef database update
```
- SQL script generate (from migration)
```bash
dotnet ef migrations script
```

#### .NET Core CLI tools for EF Core
```
dotnet tool install --global dotnet-ef
dotnet-ef --help
```
- database (drop, update)
- DbContext (info, list, scaffold)
- Migrations (add, list, remove, script)
## Issues:
### Issue 1: Run SQLServer on Mac
### Issue 2: Configuration with appsetting.json cannot create migrations
- Code snippet
```csharp
public class SchoolDbContext: DbContext
{
    IConfiguration appConfig;
    public SchoolDbContext(IConfiguration config)
    {
        appConfig = config;
    }
}
```
 
- Error:
```
An error occurred while accessing the Microsoft.Extensions.Hosting services. Continuing without the application service provider. Error: The entry point exited without ever building an IHost.
Unable to create a 'DbContext' of type ''. The exception 'Unable to resolve service for type 'Microsoft.Extensions.Configuration.IConfiguration' while attempting to activate 'SchoolManager.SchoolDbContext'.' was thrown while attempting to create an instance. For the different patterns supported at design time, see https://go.microsoft.com/fwlink/?linkid=851728
```

- Temp solution: not use config
- Fix by: add constructor `public SchoolDbContext() { }` to code.


> IN PROCESS: https://www.entityframeworktutorial.net/efcore/saving-data-in-connected-scenario-in-ef-core.aspx