using StoreManagement.Entities;
using StoreManagement.DTOs;

namespace StoreManagement.Profiles;

public class UserProfile : BaseProfile
{
    public UserProfile()
    {
        // Mapping output DTOs
        CreateMap<User, UserResponseDTO>();
    }
}
