using StoreManagement.Errors;
using StoreManagement.Exceptions;

namespace StoreManagement.Repositories;

public class RoleRepository(
    StoreManagementDbContext dbContext,
    RoleManager<IdentityRole> RoleManager) :
    GenericRepository<IdentityRole>(dbContext), IRoleRepository
{
    public async Task<IdentityResult> CreateAsync(string roleName)
    {
        if (roleName != UserRole.Admin && roleName != UserRole.User)
        {
            throw new RoleNotSupportException(
                RoleErrorCode.RoleNotSupport, RoleErrorMessage.RoleNotSupport);
        }

        return await RoleManager.CreateAsync(new IdentityRole(roleName));
    }

    public async Task<IdentityRole?> FindByNameAsync(string roleName)
    {
        return await RoleManager.FindByNameAsync(roleName);
    }
}
