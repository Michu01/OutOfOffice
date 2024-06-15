using Api.Common;
using Api.Identity.Commands;

using MediatR;

namespace Api.Identity;

public static class Endpoints
{
    public static void MapIdentityEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder
           .MapGroup("identity")
           .WithTags("Identity");

        group.MapPost("signIn", SignIn);
        group
            .MapPost("signOut", SignOut)
            .RequireAuthorization();
    }

    private static async Task<IResult> SignIn(IMediator mediator, HttpContext httpContext, string fullName)
    {
        var request = new SignIn(httpContext, fullName);

        var result = await mediator.Send(request);

        return result.MapToResponse();
    }

    private static async Task<IResult> SignOut(IMediator mediator, HttpContext httpContext)
    {
        var request = new SignOut(httpContext);

        await mediator.Send(request);

        return Results.Ok();
    }
}
