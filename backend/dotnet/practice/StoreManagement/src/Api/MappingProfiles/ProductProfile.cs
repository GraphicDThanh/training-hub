using StoreManagement.Entities;
using StoreManagement.DTOs;

namespace StoreManagement.Profiles;

public class ProductProfile : BaseProfile
{
    public ProductProfile()
    {
        CreateMap<CreateProductDTO, Product>();
        CreateMap<UpdateProductDTO, Product>();
        CreateMap<Product, ProductShortFormResponseDTO>();
        CreateMap<Product, ProductResponseDTO>();
        CreateMap<Product, CartItemProductDTO>();
        CreateMap<Product, ProductResponseV2DTO>();
    }
}
