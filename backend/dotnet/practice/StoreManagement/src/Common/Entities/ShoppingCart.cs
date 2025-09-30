using StoreManagement.Enums;

namespace StoreManagement.Entities;

public class ShoppingCart : BaseEntity
{
    public ShoppingCartStatus? Status { get; set; } = ShoppingCartStatus.CREATED;
    public string? UserId { get; set; }
    public User? User { get; set; }
    public ICollection<CartItem>? CartItems { get; }
}
