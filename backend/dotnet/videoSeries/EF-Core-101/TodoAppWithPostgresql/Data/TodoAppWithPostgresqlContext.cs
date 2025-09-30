using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TodoAppWithPostgresql.Models;

namespace TodoAppWithPostgresql.Data;

public class TodoAppWithPostgresqlDbContext: DbContext
{
    public DbSet<Todo> Todos { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        var builder = new ConfigurationBuilder();
        builder.SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
        IConfiguration config = builder.Build();
        
        options.UseNpgsql(config["TodoAppWithPostgresqlConnectString"]);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        //Set the default schema
        builder.HasDefaultSchema("ConfigStore");
        
        //Continue with the call./Migrate
        base.OnModelCreating(builder);
    }
}