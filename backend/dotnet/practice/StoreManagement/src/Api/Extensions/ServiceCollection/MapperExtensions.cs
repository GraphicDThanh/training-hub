using System.Reflection;
using StoreManagement.Profiles;

namespace StoreManagement.Extensions;

public static class MapperExtensions
{
    public static IServiceCollection AddMapper(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetAssembly(typeof(BaseProfile))!);
        return services;
    }
}
