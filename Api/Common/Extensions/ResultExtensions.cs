using Api.Common.FluentResults;

using FluentResults;

namespace Api.Common.Extensions;

public static class ResultExtensions
{
    public static IResult MapToResponse(this Result result)
    {
        if (result.IsSuccess)
        {
            return Results.Ok();
        }

        var firstError = result.Errors.First();

        return firstError switch
        {
            NotFoundResult => Results.NotFound(firstError.Message),
            ForbiddenResult => Results.Problem(firstError.Message, statusCode: StatusCodes.Status403Forbidden),
            _ => Results.Problem(firstError.Message)
        };
    }

    public static IResult MapToResponse<T>(this Result<T> result)
    {
        if (result.IsSuccess)
        {
            return Results.Ok(result.Value);
        }

        return result.ToResult().MapToResponse();
    }
}

