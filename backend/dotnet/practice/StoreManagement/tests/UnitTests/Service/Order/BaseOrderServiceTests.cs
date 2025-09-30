using NSubstitute.ExceptionExtensions;
using StoreManagement.Patterns;
using StoreManagement.Repositories;
using StoreManagement.Services;
using StoreManagement.Specifications;

namespace StoreManagement.UnitTests.Services.OrderTests;

public abstract class BaseOrderServiceTests
    : BaseServiceTests<Order, IOrderService, IOrderRepository>
{
    internal IOrderService _service;

    internal readonly IOrderItemRepository _orderItemRepositoryMock;

    internal BaseOrderServiceTests()
    {
        _repositoryMock = Substitute.For<IOrderRepository>();
        _orderItemRepositoryMock = Substitute.For<IOrderItemRepository>();
        _service = new OrderService(_loggerMock, _repositoryMock, _orderItemRepositoryMock, _cacheServiceMock);
    }

    internal void MockGetById(string orderId, Order? value)
    {
        _repositoryMock.GetByIdAsync(orderId).Returns(value);
    }

    internal void MockGetByIdAsyncThrowError(string orderId)
    {
        _repositoryMock
            .When(x => x.GetByIdAsync(orderId))
            .Do(x => throw new Exception(ErrorMessage.InternalError));
    }

    internal void MockGetAllSpecificationAsync(IList<Order> orders)
    {
        _repositoryMock.GetAllSpecificationAsync(Arg.Any<OrdersSpec>()).Returns(orders);
    }

    internal void MockGetAllSpecificationPaginationAsync(PaginatedList<Order> orders)
    {
        _repositoryMock.GetAllSpecificationPaginationAsync(Arg.Any<OrdersSpec>()).Returns(orders);
    }

    internal void MockGetAllSpecificationAsyncThrowError()
    {
        _repositoryMock.GetAllSpecificationAsync(Arg.Any<OrdersSpec>()).Throws(
            new Exception(ErrorMessage.InternalError));
    }

    internal void MockGetAllSpecificationPaginationAsyncThrowError()
    {
        _repositoryMock.GetAllSpecificationPaginationAsync(Arg.Any<OrdersSpec>()).Throws(
            new Exception(ErrorMessage.InternalError));
    }

    internal void MockAddAsync(Order order)
    {
        _repositoryMock.AddAsync(order).Returns(order);
    }

    internal void MockAddAsyncThrowError(Order order)
    {
        _repositoryMock
            .When(x => x.AddAsync(order))
            .Do(x => throw new Exception(ErrorMessage.InternalError));
    }
}
