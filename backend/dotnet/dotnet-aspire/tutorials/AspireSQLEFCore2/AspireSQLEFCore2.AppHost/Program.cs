var builder = DistributedApplication.CreateBuilder(args);

var sql = builder.AddSqlServer("sql").AddDatabase("sqldata");

builder.AddProject<Projects.AspireSQLEFCore2_BlazorWebApp>("blazorwebapp")
    .WithReference(sql);

builder.Build().Run();
