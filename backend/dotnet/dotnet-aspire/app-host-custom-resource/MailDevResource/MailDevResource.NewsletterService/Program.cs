using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<SmtpClient>(sp =>
{
    var smtpUri = new Uri(builder.Configuration.GetConnectionString("maildev")!);
    var smtpClient = new SmtpClient(smtpUri.Host, smtpUri.Port);
    return smtpClient;
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
});

app.MapPost("/subscribe", async ([FromServices] SmtpClient smtpClient, string email) =>
{
    using var message = new MailMessage("newsletter@yourcompany.com", email)
    {
        Subject = "Welcome to our newsletter!",
        Body = "Thank you for subscribing to our newsletter!"
    };

    await smtpClient.SendMailAsync(message);
});

app.MapPost("/unsubscribe", async ([FromServices] SmtpClient smtpClient, string email) =>
{
    using var message = new MailMessage("newsletter@yourcompany.com", email)
    {
        Subject = "You are unsubscribed from our newsletter!",
        Body = "Sorry to see you go. We hope you will come back soon!"
    };

    await smtpClient.SendMailAsync(message);
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
