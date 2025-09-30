using Microsoft.EntityFrameworkCore;
using ConsoleAppWithSqlite.Models;
using Microsoft.Extensions.Configuration;

namespace ConsoleAppWithSqlite.Data;

public class ConsoleAppDbContect: DbContext
{
    public DbSet<Todo> Todos { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        var builder = new ConfigurationBuilder();
        builder.SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
        IConfiguration config = builder.Build();
        
        options.UseSqlite(config["ConsoleAppWithSqliteConnectString"]);
    }
}