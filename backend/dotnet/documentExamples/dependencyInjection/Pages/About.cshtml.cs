using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using dependencyInjection.Interfaces;
using dependencyInjection.Services;

namespace dependencyInjection.Pages;

public class AboutModel : PageModel
{
    private readonly ILogger _logger;

    private readonly IMyDependency _myDependency2;

    public AboutModel(ILogger<AboutModel> logger, IMyDependency myDependency2)
    {
        _logger = logger;
        _myDependency2 = myDependency2;
    }

    public string Message { get; set; } = string.Empty;

    public void OnGet()
    {
        Message = $"About page visited at {DateTime.UtcNow.ToLongTimeString()}";
        _logger.LogInformation(Message);
    }
}