using StoreManagement.Entities;
using StoreManagement.DTOs;

namespace StoreManagement.Profiles;

public class ShoppingCartProfile : BaseProfile
{
    public ShoppingCartProfile()
    {
        CreateMap<ShoppingCart, ShoppingCartDTO>();
        CreateMap<ShoppingCart, ActiveShoppingCartResponseDTO>();
        CreateMap<CartItem, CartItemDTO>();
        CreateMap<CartItem, CreateOrderItemDTO>();
    }
}
