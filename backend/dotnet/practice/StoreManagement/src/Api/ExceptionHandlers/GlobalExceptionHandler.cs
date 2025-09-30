using System.Diagnostics;
using Microsoft.AspNetCore.Diagnostics;

namespace StoreManagement.ExceptionHandlers;

public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var traceId = Activity.Current?.Id ?? httpContext.TraceIdentifier;
        logger.LogError(
            exception,
            "Could not process a request on machine {MachineName} with trace id {TraceId}",
            Environment.MachineName,
            traceId
        );

        await Results.Problem(
            title: "Sorry for the inconvenience! We are working on this mistake.",
            statusCode: StatusCodes.Status500InternalServerError,
            extensions: new Dictionary<string, object?>
            {
                {"traceId", traceId}
            }
        ).ExecuteAsync(httpContext);

        // stop the pipeline
        return true;
    }
}
