## Practice with tutorial EF Core 101
> [link](https://www.youtube.com/watch?v=c-wN-fc594c&list=PLdo4fOcmZ0oXCPdC3fTFA3Z79-eVH3K-s)
- Have database exists
- Practice to generate scaffold from existing database

    ```bash
    dotnet ef dbcontext scaffold "\
        Data Source=localhost,1433;\
        Database=ContosoPizzaConsoleDB;\
        Integrated Security=True;\
        User ID=sa;\
        Password=1StrongPassword@;\
        TrustServerCertificate=True;\
        Trusted_Connection=false" \
        Microsoft.EntityFrameworkCore.SqlServer \
        --context-dir Data \
        --output-dir Models \
        --data-annotations
    ```
- With data annotation
```bash
   {...}
    --data-annotation
```

- To separate folder `Generated`
```bash
    {...}
    --output-dir Models\Generate \
    --context-namespace ContosoPizzaWebApp.Data
    --namespace ContosoPizzaWebApp
```

### Secret
- Init secret
```bash
dotnet user-secrets init
```

- Set secret
```bash
dotnet user-secrets set "ContosoPizzaWebApp:ConnectionString" "Data Source=localhost,1433;Database=ContosoPizzaConsoleDB;Integrated Security=True;User ID=sa;Password=1StrongPassword@;TrustServerCertificate=True;Trusted_Connection=false"
```
    - Secret file save in `~/.microsoft/usersecrets/<secret_id>/secrets.json

### Web Generate
- Add package
```bash
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet tool install -g dotnet-aspnet-codegenerator
```
- Run command generate pages
```bash
dotnet aspnet-codegenerator razorpage --model Product --dataContext ContosoPizzaContext --relativeFolderPath Pages/Customers --referenceScriptLibraries
```