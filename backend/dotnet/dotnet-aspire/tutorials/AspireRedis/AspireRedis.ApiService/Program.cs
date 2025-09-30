using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;

var builder = WebApplication.CreateBuilder(args);

builder.AddRedisDistributedCache("cache");

// Add service defaults & Aspire components.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddProblemDetails();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

app.MapGet("/weatherforecast", async (IDistributedCache cache) =>
{
    var cachedForecast = await cache.GetAsync("forecast");

    if (cachedForecast is null)
    {
        var summaries = new[] { "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching" };
        var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();

        await cache.SetAsync("forecast", Encoding.UTF8.GetBytes(JsonSerializer.Serialize(forecast)), new ()
        {
            AbsoluteExpiration = DateTime.Now.AddSeconds(10)
        }); ;

        return forecast;
    }

    return JsonSerializer.Deserialize<IEnumerable<WeatherForecast>>(cachedForecast);
})
.WithName("GetWeatherForecast");

app.MapDefaultEndpoints();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
