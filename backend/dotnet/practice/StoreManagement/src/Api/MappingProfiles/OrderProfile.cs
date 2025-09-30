using StoreManagement.Entities;
using StoreManagement.DTOs;

namespace StoreManagement.Profiles;

public class OrderProfile : BaseProfile
{
    public OrderProfile()
    {
        CreateMap<Order, OrderDetailResponseDTO>();
        CreateMap<Order, OrderInListResponseDTO>();
        CreateMap<OrderItem, OrderItemResponseDTO>();
    }
}
