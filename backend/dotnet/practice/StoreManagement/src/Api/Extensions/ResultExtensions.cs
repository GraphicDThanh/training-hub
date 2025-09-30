
using StoreManagement.DTOs;
using StoreManagement.Errors;
using StoreManagement.Patterns;
using StoreManagement.Constants;

namespace StoreManagement.Extensions;

public static class ResultExtensions
{
    public static ObjectResult ToProblemDetails(this Result result)
    {
        if (result.IsSuccess)
            throw new InvalidOperationException();

        var StatusCodeHttp = MapResultFailure(result);

        var value = new ResultFailureDTO
        {
            Type = StatusCodeHttp.ReferenceLink,
            Title = StatusCodeHttp.Title,
            Status = StatusCodeHttp.StatusCode,
            ErrorCode = StatusCodeHttp.Code,
            Description = StatusCodeHttp.Description
        };

        return new ObjectResult(value) { StatusCode = StatusCodeHttp.StatusCode };

        static StatusCodeHttp MapResultFailure(Result result)
        {
            var errorType = result.Error.Type;
            var code = result.Error.Code;
            var description = result.Error.Description;

            return errorType switch
            {
                ErrorType.NotFound => new StatusCodeHttp(StatusCodes.Status404NotFound, code, description),
                ErrorType.Validation => new StatusCodeHttp(StatusCodes.Status400BadRequest, code, description),
                ErrorType.Conflict => new StatusCodeHttp(StatusCodes.Status409Conflict, code, description),
                ErrorType.Unauthorized => new StatusCodeHttp(StatusCodes.Status401Unauthorized, code, description),
                ErrorType.Forbidden => new StatusCodeHttp(StatusCodes.Status403Forbidden, code, description),
                ErrorType.Failure => new StatusCodeHttp(StatusCodes.Status500InternalServerError, code, description),
                ErrorType.NotImplement => new StatusCodeHttp(StatusCodes.Status501NotImplemented, code, description),

                _ => throw new NotImplementedException()
            };
        }
    }
}
