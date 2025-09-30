using System.Security.Claims;
using StoreManagement.Repositories;
using StoreManagement.Services;

namespace StoreManagement.UnitTests.Services.ShoppingCartTests;

public abstract class BaseShoppingCartServiceTests : BaseServiceTests<ShoppingCart, ShoppingCartService, IShoppingCartRepository>
{
    internal readonly ShoppingCartService _shoppingCartService;
    internal readonly IUserRepository _userRepositoryMock;
    internal readonly IProductRepository _productRepositoryMock;
    internal readonly IShoppingCartRepository _shoppingCartRepositoryMock;
    internal readonly ICartItemRepository _cartItemRepositoryMock;
    internal readonly IOrderRepository _orderRepositoryMock;
    internal readonly IOrderService _orderServiceMock;

    internal BaseShoppingCartServiceTests()
    {
        _userRepositoryMock = Substitute.For<IUserRepository>();
        _productRepositoryMock = Substitute.For<IProductRepository>();
        _cartItemRepositoryMock = Substitute.For<ICartItemRepository>();
        _orderRepositoryMock = Substitute.For<IOrderRepository>();
        _orderServiceMock = Substitute.For<IOrderService>();
        _shoppingCartRepositoryMock = Substitute.For<IShoppingCartRepository>();
        _shoppingCartService = new ShoppingCartService(
            _loggerMock,
            _emailSenderMock,
            _userRepositoryMock,
            _productRepositoryMock,
            _shoppingCartRepositoryMock,
            _cartItemRepositoryMock,
            _orderRepositoryMock,
            _orderServiceMock,
            _cacheServiceMock
        );
    }

    internal void MockGetById(string shoppingCartId, ShoppingCart? value)
    {
        _shoppingCartRepositoryMock.GetByIdAsync(shoppingCartId).Returns(value);
    }

    internal void MockGetByIdAsyncThrowError(string shoppingCartId)
    {
        _shoppingCartRepositoryMock
            .When(x => x.GetByIdAsync(shoppingCartId))
            .Do(x => throw new Exception(ErrorMessage.InternalError));
    }

    internal void MockGetByUserIdAsync(string userId, ShoppingCart? value)
    {
        _shoppingCartRepositoryMock.GetByUserIdAsync(userId).Returns(value);
    }

    internal void MockGetByUserIdAsyncThrowError(string userId)
    {
        _shoppingCartRepositoryMock
            .When(x => x.GetByUserIdAsync(userId))
            .Do(x => throw new Exception(ErrorMessage.InternalError));
    }

    internal void MockUserRepoGetUserByIdThrowError(string userId)
    {
        _userRepositoryMock
            .When(x => x.GetByIdAsync(userId))
            .Do(x => throw new Exception(ErrorMessage.InternalError));
    }

    internal void MockUserRepoGetUserById(string userId, User? value)
    {
        _userRepositoryMock.GetByIdAsync(userId).Returns(value);
    }

    internal void MockAddAsync(ShoppingCart shoppingCart)
    {
        _shoppingCartRepositoryMock.AddAsync(shoppingCart).Returns(shoppingCart);
    }

    internal void MockAddAsyncThrowError()
    {
        _shoppingCartRepositoryMock
            .When(x => x.AddAsync(Arg.Any<ShoppingCart>()))
            .Do(x => throw new Exception(ErrorMessage.InternalError));
    }

    internal void MockOrderRepoGetByShoppingCartIdAsync(string shoppingCartId, Order? value)
    {
        _orderRepositoryMock.GetByShoppingCartIdAsync(shoppingCartId).Returns(value);
    }

    internal void MockProductRepoGetByIdAsync(string productId, Product? value)
    {
        _productRepositoryMock.GetByIdAsync(productId).Returns(value);
    }
}
