### Secret
- init user secrets in `~/.microsoft/<secret>/secrets.json`
```bash
dotnet user-secrets init
```
- set
```bash
dotnet use-secrets set "ConsoleAppWithSqliteConnectString" "Data Source: ConsoleAppWithSqlite.db"
```

### Migrations
- add migrations
```bash
dotnet ef migration add InitCreate 
```

### Update DB
- update 
```
dotnet ef database update
```