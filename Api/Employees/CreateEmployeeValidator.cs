using Api.Employees.Models;

using FluentValidation;

namespace Api.Employees;

public class CreateEmployeeValidator : AbstractValidator<CreateEmployee>
{
    public CreateEmployeeValidator()
    {
        RuleFor(e => e.FullName)
            .NotEmpty()
            .MaximumLength(Constants.MaxFullNameLength);

        RuleFor(e => e.Subdivision)
            .NotEmpty()
            .MaximumLength(Constants.MaxSubdivisionLength);

        RuleFor(e => e.OutOfOfficeBalance)
            .GreaterThanOrEqualTo(0);
    }
}
