namespace StoreManagement.Repositories;

public class ShoppingCartRepository(StoreManagementDbContext dbContext) :
    GenericRepository<ShoppingCart>(dbContext), IShoppingCartRepository
{
    new public async Task<ShoppingCart?> GetByIdAsync(string id)
    {
        var shoppingCart = await _dbContext.ShoppingCarts.FindAsync(id);
        if (shoppingCart is null)
            return null;

        // Explicitly load the CartItems navigation property.
        await _dbContext.Entry(shoppingCart).Collection(s => s.CartItems!).LoadAsync();

        // Load the related Product navigation property.
        foreach (var cartItem in shoppingCart.CartItems!)
        {
            await _dbContext.Entry(cartItem).Reference(ci => ci.Product).LoadAsync();
        }

        return shoppingCart;
    }

    public async Task<ShoppingCart?> GetByUserIdAsync(string userId)
    {
        return await _dbContext.ShoppingCarts.FirstOrDefaultAsync(
            shoppingCart => shoppingCart.UserId! == userId & shoppingCart.Status == ShoppingCartStatus.CREATED);
    }

    public async Task UpdateCartStatusAsync(ShoppingCart shoppingCart, ShoppingCartStatus status)
    {
        shoppingCart.Status = status;
        await _dbContext.SaveChangesAsync();
    }
}
