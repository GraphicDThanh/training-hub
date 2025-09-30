
https://learn.microsoft.com/en-us/training/modules/persist-data-ef-core

Note: 
- https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Sqlite#versions-body-tab
- https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Design 

Issue:
- `dotnet add package Microsoft.EntityFrameworkCore.Sqlite` auto install latest version `8.0.3` not compatible with all packages in repo.

Fix: install lower version
- `dotnet add package Microsoft.EntityFrameworkCore.Sqlite -v 7.0.17`

Similar for `Microsoft.EntityFrameworkCore.Design`