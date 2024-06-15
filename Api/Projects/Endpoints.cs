using Api.Common.Extensions;
using Api.Identity;
using Api.Projects.Commands;
using Api.Projects.Models;
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
            .WithTags("Projects");

        group
            .MapGet(string.Empty, GetProjects)
            .RequireAuthorization(nameof(Policy.ViewProjects));

        group
            .MapGet("{id}", GetProject)
            .RequireAuthorization(nameof(Policy.ViewProjects));

        group
            .MapPost(string.Empty, PostProject)
            .RequireAuthorization(nameof(Policy.ManageProjects));
    }

    private static async Task<IResult> GetProjects(IMediator mediator, [AsParameters] GetProjects request)
    {
        var result = await mediator.Send(request);

        return Results.Ok(result);
    }

    private static async Task<IResult> GetProject(IMediator mediator, [AsParameters] GetProject request)
    {
        var result = await mediator.Send(request);

        return result.MapToResponse();
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
