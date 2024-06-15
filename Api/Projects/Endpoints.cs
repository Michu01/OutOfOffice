using System.Security.Claims;

using Api.Common;
using Api.Identity;
using Api.Projects.Commands;
using Api.Projects.Queries;

using FluentValidation;

using MediatR;

namespace Api.Projects;

public static class Endpoints
{
    public static void MapProjectEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder
            .MapGroup("projects")
            .WithTags("Projects")
            .RequireAuthorization();

        group.MapGet(string.Empty, GetProjects);
        group
            .MapPost(string.Empty, PostProject)
            .RequireAuthorization(nameof(Policy.ManageProjects));
    }

    private static async Task<IResult> GetProjects(IMediator mediator, [AsParameters] GetProjects request)
    {
        var result = await mediator.Send(request);

        return Results.Ok(result);
    }

    private static async Task<IResult> PostProject(IMediator mediator, IValidator<CreateProject> validator, CreateProject project)
    {
        var validationResult = await validator.ValidateAsync(project);

        if (!validationResult.IsValid)
        {
            return validationResult.ToResponse();
        }

        var result = await mediator.Send(new AddProject(project));

        return Results.Ok(result);
    }
}
