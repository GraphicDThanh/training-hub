using System.ComponentModel.DataAnnotations.Schema;
using StoreManagement.Enums;

namespace StoreManagement.Entities;

public class Order : BaseEntity
{
    public OrderStatus Status { get; set; } = OrderStatus.PLACED;
    [Column(TypeName = "decimal(18,4)")]
    public decimal TotalPay { get; set; } = 0;
    public string? UserId { get; set; }
    public User? User { get; set; }
    public string? ShoppingCartId { get; set; }
    public ShoppingCart? ShoppingCart { get; set; }
    public ICollection<OrderItem>? OrderItems { get; }

}
