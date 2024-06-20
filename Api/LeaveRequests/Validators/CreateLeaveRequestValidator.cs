using Api.LeaveRequests.Models;
using FluentValidation;

namespace Api.LeaveRequests.Validators;

public class CreateLeaveRequestValidator : AbstractValidator<CreateLeaveRequest>
{
    public CreateLeaveRequestValidator()
    {
        RuleFor(e => e.AbsenceReason)
            .NotEmpty()
            .MaximumLength(Constants.MaxAbsenceReasonLength);

        RuleFor(e => e.StartDate)
            .GreaterThanOrEqualTo(DateTime.Today)
            .LessThanOrEqualTo(e => e.EndDate);

        RuleFor(e => e.Comment)
            .MaximumLength(Constants.MaxCommentLength);
    }
}
