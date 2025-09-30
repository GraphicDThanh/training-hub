var builder = DistributedApplication.CreateBuilder(args);

var redis = builder.AddRedis("cache");

var apiService = builder.AddProject<Projects.AspireRedis_ApiService>("apiservice")
    .WithReference(redis);

builder.AddProject<Projects.AspireRedis_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithReference(apiService)
    .WithReference(redis);

builder.Build().Run();
 