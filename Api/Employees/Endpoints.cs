using Api.Common;
using Api.Employees.Commands;
using Api.Employees.Queries;
using Api.Projects.Queries;

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

        group.MapGet(string.Empty, GetEmployees);
        group.MapPost(string.Empty, PostEmployee);
    }

    private static async Task<IResult> GetEmployees(IMediator mediator, [AsParameters] GetEmployees request)
    {
        var result = await mediator.Send(request);

        return Results.Ok(result);
    }

    private static async Task<IResult> PostEmployee(IMediator mediator, IValidator<CreateEmployee> validator, CreateEmployee employee)
    {
        var validationResult = await validator.ValidateAsync(employee);

        if (!validationResult.IsValid)
        {
            return validationResult.ToResponse();
        }

        var result = await mediator.Send(new AddEmployee(employee));

        return Results.Ok(result);
    }
}
