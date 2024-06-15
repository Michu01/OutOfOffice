using Api.Employees.Queries;
using Api.Projects.Models;
using FluentValidation;

using MediatR;

namespace Api.Projects;

public class CreateProjectValidator : AbstractValidator<CreateProject>
{
    public CreateProjectValidator(IMediator mediator)
    {
        RuleFor(e => e.Name)
            .NotEmpty()
            .MaximumLength(Constants.MaxNameLength);

        RuleFor(e => e.Type)
            .NotEmpty()
            .MaximumLength(Constants.MaxTypeLength);

        RuleFor(e => e.EndDate)
            .GreaterThanOrEqualTo(e => e.StartDate);

        RuleFor(e => e.ProjectManagerId)
            .MustAsync((id, ct) => mediator.Send(new GetProjectManagerExists(id), ct))
            .WithMessage("Employee doesn't exist or isn't a Project Manager");

        RuleFor(e => e.Comment)
            .MaximumLength(Constants.MaxCommentLength);
    }
}
