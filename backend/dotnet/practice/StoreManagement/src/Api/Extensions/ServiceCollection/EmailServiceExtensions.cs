using Microsoft.AspNetCore.Identity.UI.Services;
using StoreManagement.Options;
using StoreManagement.Services;


namespace StoreManagement.Extensions;
public static class EmailServiceExtensions
{
    public static IServiceCollection AddEmailServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddTransient<IEmailSender, EmailSender>();
        services.Configure<AuthMessageSenderOptions>(configuration);

        return services;
    }
}
