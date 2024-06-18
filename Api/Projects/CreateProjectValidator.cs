using Api.Projects.Models;

using FluentValidation;

namespace Api.Projects;

public class CreateProjectValidator : AbstractValidator<CreateProject>
{
    public CreateProjectValidator()
    {
        RuleFor(e => e.Name)
            .NotEmpty()
            .MaximumLength(Constants.MaxNameLength);

        RuleFor(e => e.Type)
            .NotEmpty()
            .MaximumLength(Constants.MaxTypeLength);

        RuleFor(e => e.EndDate)
            .GreaterThanOrEqualTo(e => e.StartDate);

        RuleFor(e => e.Comment)
            .MaximumLength(Constants.MaxCommentLength);

        RuleFor(e => e.EmployeeIds)
            .NotNull();
    }
}
