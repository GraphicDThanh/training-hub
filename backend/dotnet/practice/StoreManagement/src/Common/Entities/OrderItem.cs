using System.ComponentModel.DataAnnotations.Schema;

namespace StoreManagement.Entities;

public class OrderItem : BaseEntity
{
    public int Quantity { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal Price { get; set; }

    public string? ProductId { get; set; }
    public Product? Product { get; set; }

    public string? OrderId { get; set; }
    public Order? Order { get; set; }
}
