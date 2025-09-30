using Microsoft.AspNetCore.Identity;

namespace StoreManagement.Entities;

public class User : IdentityUser
{
    public string? Name { get; init; } = default!;
    public string? Address { get; init; } = default!;

    public ICollection<Order>? Orders { get; }
    public ICollection<ShoppingCart>? ShoppingCarts { get; }
}
