using Api.Employees.Queries;

using FluentValidation;

using MediatR;

namespace Api.Employees;

public class CreateEmployeeValidator : AbstractValidator<CreateEmployee>
{
    public CreateEmployeeValidator(IMediator mediator)
    {
        RuleFor(e => e.FullName)
            .NotEmpty()
            .MaximumLength(Constants.MaxFullNameLength);

        RuleFor(e => e.Subdivision)
            .NotEmpty()
            .MaximumLength(Constants.MaxSubdivisionLength);

        RuleFor(e => e.PeoplePartnerId)
            .MustAsync(async (id, ct) => id is null || await mediator.Send(new GetHRManagerExists(id.Value), ct))
            .WithMessage("Employee doesn't exist or isn't an HR Manager");

        RuleFor(e => e.OutOfOfficeBalance)
            .GreaterThanOrEqualTo(0);
    }
}
