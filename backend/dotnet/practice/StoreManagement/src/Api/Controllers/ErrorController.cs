using Microsoft.AspNetCore.Diagnostics;

namespace StoreManagement.Controllers;

[ApiExplorerSettings(IgnoreApi = true)]
public class ErrorController : ControllerBase
{
    [Route("/error")]
    public IActionResult HandleError(
        [FromServices] IHostEnvironment hostEnvironment)
    {
        if (!hostEnvironment.IsDevelopment())
            return NotFound();

        var exceptionHandlerFeature = HttpContext.Features.Get<IExceptionHandlerFeature>();

        return Problem(
            detail: exceptionHandlerFeature?.Error.StackTrace,
            title: exceptionHandlerFeature?.Error.Message
        );
    }
}


