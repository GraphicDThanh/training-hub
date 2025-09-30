using Microsoft.EntityFrameworkCore;
using ContosoPizzaConsole.Models;
using Microsoft.Extensions.Configuration;

namespace ContosoPizzaConsole.Data;

public class ContosoPizzaContext: DbContext
{
    public DbSet<Customer> Customers { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<Product> Products { get; set; } = null!;
    public DbSet<OrderDetail> OrderDetails { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var builder = new ConfigurationBuilder();
        builder.SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
        IConfiguration config = builder.Build();
        
        optionsBuilder.UseSqlServer(config["ContosoPizzaConsoleDBConnectString"]);
    }
}