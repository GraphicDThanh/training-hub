using Microsoft.AspNetCore.Mvc.Filters;
using StoreManagement.DTOs;

namespace StoreManagement.ActionFilters;

public class ModelStateValidationResultFilter : IResultFilter
{
    public void OnResultExecuted(ResultExecutedContext context)
    {}

    public void OnResultExecuting(ResultExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var count = context.ModelState.Count;
            var errors = new Dictionary<string, string[]>(count);

            foreach (var keyModelStatePair in context.ModelState)
            {
                var key = keyModelStatePair.Key;
                var modelErrors = keyModelStatePair.Value.Errors;
                if (modelErrors is not null && modelErrors.Count > 0)
                {
                    var errorMessages = modelErrors.Select(error => error.ErrorMessage).ToArray();
                    errors.Add(key, errorMessages);
                }
            }

            var result = new ResultFailureDTO {
                Success = false,
                Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1",
                Title = "Bad Request",
                Status = StatusCodes.Status400BadRequest,
                ErrorCode = "Errors.ModelValidation",
                Description = "Model validation failed",
                Errors = errors
            };

            context.Result = new BadRequestObjectResult(result);
        }
    }
}
