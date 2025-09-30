using Serilog;
using System.Globalization;
using StoreManagement.Entities;
using StoreManagement.Extensions;
using StoreManagement.ActionFilters;
using Asp.Versioning.Builder;
using Asp.Versioning;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// --- CONFIGURE SERILOG ---
// Create log instance
// Enable it to write logs to console
new LoggerConfiguration().WriteTo.Console(
    formatProvider: CultureInfo.InvariantCulture
).CreateLogger();

// Add Serilog to DI Container
builder.Host.UseSerilog((context, loggerConfiguration) => loggerConfiguration
    .WriteTo.Console(formatProvider: CultureInfo.InvariantCulture)
    .ReadFrom.Configuration(context.Configuration));
// --- CONFIGURE SERILOG ---


// --- CONFIGURE SERVICES ---
builder.Services.AddDbContextConfig(builder.Configuration);
builder.Services.AddRepositories();
builder.Services.AddServices();
builder.Services.AddEmailServices(builder.Configuration);
builder.Services.AddIdentityFramework();
builder.Services.AddMapper();
builder.Services.AddFluentValidationConfig();
builder.Services.AddControllers(
    options => options.Filters.Add<ModelStateValidationResultFilter>()
);
builder.Services.AddExceptionHandling();
builder.Services.AddApiConfig();
builder.Services.AddCache();
// --- CONFIGURE SERVICES ---


WebApplication app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    // no versioning
    // app.UseSwaggerUI();
    app.UseSwaggerUI(options =>
    {
        var apiVersions = app.DescribeApiVersions();

        foreach (var version in apiVersions)
        {
            options.SwaggerEndpoint($"/swagger/{version.GroupName}/swagger.json", version.GroupName);
        }
    });
}

app.DbInitAsync(app.Environment);
app.UseExceptionHandler("/error");
app.UseStatusCodePages();
app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// Identity API config with versioning
ApiVersionSet apiVersionSet = app.NewApiVersionSet()
    .HasApiVersion(new ApiVersion(1, 0))
    .ReportApiVersions()
    .Build();
app.MapGroup("api/v{version:apiVersion}/auth").MapIdentityApi<User>().WithApiVersionSet(apiVersionSet);
// app.MapGroup("api/v1/auth").MapIdentityApi<User>();

app.MapControllers();
app.Run();


// Purpose: integration testing project access entry point
public partial class Program { }
