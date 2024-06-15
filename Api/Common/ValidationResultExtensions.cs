using FluentValidation.Results;

namespace Api.Common;

public static class ValidationResultExtensions
{
    public static IResult ToResponse(this ValidationResult validationResult)
    {
        return Results.ValidationProblem(validationResult
            .Errors
            .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
            .ToDictionary(e => e.Key, e => e.ToArray()));
    }
}
