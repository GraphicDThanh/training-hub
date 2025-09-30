using Microsoft.AspNetCore.Http;

namespace StoreManagement.Constants;

public record StatusCodeHttp
{
    public int StatusCode { get; init; }
    public string? Title { get; init; }
    public string? Code { get; init; }
    public string? Description { get; init; }
    public string? ReferenceLink { get; init; }

    public StatusCodeHttp(int statusCode, string code, string description)
    {
        StatusCode = statusCode;
        Code = code;

        if (StatusCode == StatusCodes.Status404NotFound)
        {
            Title = "Not Found";
            Description = description ?? "Request not found.";
            ReferenceLink = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4";
        }
        else if (StatusCode == StatusCodes.Status400BadRequest)
        {
            Title = "Bad Request";
            Description = description ?? "Request is invalid.";
            ReferenceLink = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1";
        }
        else if (StatusCode == StatusCodes.Status401Unauthorized)
        {
            Title = "Unauthorized";
            Description = description ?? "Request requires user authentication.";
            ReferenceLink = "https://datatracker.ietf.org/doc/html/rfc7235#section-3.1";
        }
        else if (StatusCode == StatusCodes.Status403Forbidden)
        {
            Title = "Forbidden";
            Description = description ?? "Request is forbidden.";
            ReferenceLink = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.3";
        }
        else if (StatusCode == StatusCodes.Status405MethodNotAllowed)
        {
            Title = "Method Not Allowed";
            Description = description ?? "Request method is not allowed.";
            ReferenceLink = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.5";
        }
        else if (StatusCode == StatusCodes.Status409Conflict)
        {
            Title = "Conflict";
            Description = description ?? "Request is conflict.";
            ReferenceLink = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.5";
        }
        else if (StatusCode == StatusCodes.Status500InternalServerError)
        {
            Title = "Internal Server Error";
            Description = description ?? "Sorry for the inconvenience! We are working on this mistake.";
            ReferenceLink = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.8";
        }
        else if (StatusCode == StatusCodes.Status501NotImplemented)
        {
            Title = "Not Implemented";
            Description = description ?? "Request is not implement.";
            ReferenceLink = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.2";
        }
    }
}

