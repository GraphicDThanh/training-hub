namespace StoreManagement.Entities;

public class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; } = 0;

    public string? ImageUrl { get; set; }

    public ICollection<CartItem>? CartItems { get; }
    public ICollection<OrderItem>? OrderItems { get; }
}
