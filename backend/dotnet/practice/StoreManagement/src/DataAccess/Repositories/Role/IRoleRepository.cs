using Microsoft.AspNetCore.Identity;
using StoreManagement.Entities;

namespace StoreManagement.Repositories;

public interface IRoleRepository : IGenericRepository<IdentityRole>
{
    Task<IdentityResult> CreateAsync(string roleName);
    Task<IdentityRole?> FindByNameAsync(string roleName);
}
