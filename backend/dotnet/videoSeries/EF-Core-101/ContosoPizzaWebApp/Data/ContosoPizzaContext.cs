using System;
using System.Collections.Generic;
using ContosoPizzaWebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ContosoPizzaWebApp.Data;

public partial class ContosoPizzaDbContext : DbContext
{
    public ContosoPizzaDbContext()
    {
    }

    public ContosoPizzaDbContext(DbContextOptions<ContosoPizzaDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
