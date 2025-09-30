using Asp.Versioning;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using StoreManagement.Api.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace StoreManagement.Extensions;

public static class ApiExtensions
{

    public static IServiceCollection AddApiConfig(this IServiceCollection services)
    {
        services.AddApiVersioning(options =>
        {
            options.DefaultApiVersion = new ApiVersion(1, 0);
            options.AssumeDefaultVersionWhenUnspecified = true;
            options.ReportApiVersions = true;
            options.ApiVersionReader = new UrlSegmentApiVersionReader();
        })
        .AddApiExplorer(options =>
        {
            // Issue: not explore API from identity
            options.GroupNameFormat = "'v'VVV";
            options.SubstituteApiVersionInUrl = true;
        });

        // services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(options =>
        {
            // api version will override this config
            // options.SwaggerDoc("v1", new OpenApiInfo
            // {
            //     Title = "Store Management API",
            //     Version = "v1",
            //     Description = "An ASP.NET Core Web API for managing online store"
            // });

            options.AddSecurityDefinition("bearerAuth", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "JWT Authorization header using the Bearer scheme.",
            });

            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "bearerAuth" }
                    },
                    Array.Empty<string>()
                }
            });

            options.OperationFilter<SwaggerDefaultValues>();
        });

        services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

        return services;
    }
}
