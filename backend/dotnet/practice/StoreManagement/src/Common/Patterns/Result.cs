using StoreManagement.Errors;

namespace StoreManagement.Patterns;

public sealed class Result
{
    private Result(bool isSuccess, Error error, object? value = null)
    {
        if (isSuccess && error != Error.None || !isSuccess && error == Error.None)
        {
            throw new ArgumentException("Invalid error", nameof(error));
        }

        IsSuccess = isSuccess;
        Error = error;
        Value = value;
    }

    public bool IsSuccess { get; }

    public bool IsFailure => !IsSuccess;

    public Error Error { get; }

    /// FIX ME: instead of object, should use generic type
    /// Result<T> to make it more type safe
    public object? Value { get; }

    public static Result Success(object? value = null) => new(true, Error.None, value);

    public static Result Failure(Error error) => new(false, error);
}

