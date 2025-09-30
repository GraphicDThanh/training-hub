using FluentValidation;
using FluentValidation.AspNetCore;
using StoreManagement.DTOs;
using StoreManagement.Validators;

namespace StoreManagement.Extensions;

public static class FluentValidationExtension
{
    public static IServiceCollection AddFluentValidationConfig(this IServiceCollection services)
    {
        services.AddValidatorsFromAssemblyContaining<CreateProductDTOValidator>();
        services.AddFluentValidationAutoValidation();
        return services;
    }
}
