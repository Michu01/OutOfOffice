using Api.Common.Extensions;
using Api.Employees.Commands;
using Api.Employees.Models;
using Api.Employees.Queries;
using Api.Identity;
using Api.Projects.Commands;

using FluentValidation;

using MediatR;

namespace Api.Employees;

public static class Endpoints
{
    public static void MapEmployeeEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder
            .MapGroup("employees")
            .WithTags("Employees");

        group
            .MapGet(string.Empty, GetEmployees)
            .RequireAuthorization(nameof(Policy.ViewEmployees));

        group
            .MapGet("{id}", GetEmployee)
            .RequireAuthorization(nameof(Policy.ViewEmployees));

        group
            .MapPost(string.Empty, AddEmployee)
            .RequireAuthorization(nameof(Policy.ManageEmployees));

        group
            .MapPut("{id}", UpdateEmployee)
            .RequireAuthorization(nameof(Policy.ManageEmployees));
    }

    private static async Task<IResult> GetEmployees(IMediator mediator, [AsParameters] GetEmployees request)
    {
        var result = await mediator.Send(request);

        return Results.Ok(result);
    }

    private static async Task<IResult> GetEmployee(IMediator mediator, [AsParameters] GetEmployee request)
    {
        var result = await mediator.Send(request);

        return result.MapToResponse();
    }

    private static async Task<IResult> AddEmployee(IMediator mediator, IValidator<CreateEmployee> validator, [AsParameters] AddEmployee request)
    {
        var validationResult = await validator.ValidateAsync(request.Employee);

        if (!validationResult.IsValid)
        {
            return validationResult.ToResponse();
        }

        var result = await mediator.Send(request);

        return Results.Ok(result);
    }

    private static async Task<IResult> UpdateEmployee(IMediator mediator, IValidator<CreateEmployee> validator, [AsParameters] UpdateEmployee request)
    {
        var validationResult = await validator.ValidateAsync(request.Employee);

        if (!validationResult.IsValid)
        {
            return validationResult.ToResponse();
        }

        var result = await mediator.Send(request);

        return result.MapToResponse();
    }
}
