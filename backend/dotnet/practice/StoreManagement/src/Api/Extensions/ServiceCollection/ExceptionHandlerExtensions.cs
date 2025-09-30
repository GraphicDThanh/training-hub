using StoreManagement.ExceptionHandlers;

namespace StoreManagement.Extensions;

public static class ExceptionHandlerExtensions
{
    public static IServiceCollection AddExceptionHandling(this IServiceCollection services)
    {
        services.AddProblemDetails();
        services.AddExceptionHandler<GlobalExceptionHandler>();
        return services;
    }
}
