using Api.Common.Extensions;
using Api.Identity.Commands;
using Api.Identity.Queries;

using MediatR;

namespace Api.Identity;

public static class Endpoints
{
    public static void MapIdentityEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder
           .MapGroup("identity")
           .WithTags("Identity");

        group
            .MapPost("signIn", SignIn);
        group
            .MapPost("signOut", SignOut)
            .RequireAuthorization();
        group
            .MapGet("isSignedIn", IsSignedIn)
            .RequireAuthorization();
        group
            .MapGet("me", GetMe)
            .RequireAuthorization();
    }

    private record SignInRequest(string FullName);

    private static async Task<IResult> SignIn(IMediator mediator, HttpContext httpContext, SignInRequest request)
    {
        var result = await mediator.Send(new SignIn(httpContext, request.FullName));

        return result.MapToResponse();
    }

    private static async Task<IResult> SignOut(IMediator mediator, HttpContext httpContext)
    {
        var request = new SignOut(httpContext);

        await mediator.Send(request);

        return Results.Ok();
    }

    private static IResult IsSignedIn()
    {
        return Results.Ok();
    }

    private static async Task<IResult> GetMe(IMediator mediator, [AsParameters] GetMe request)
    {
        var result = await mediator.Send(request);

        return result.MapToResponse();
    }
}
