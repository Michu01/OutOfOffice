using Api.LeaveRequests.Commands;

using FluentValidation;

namespace Api.LeaveRequests.Validators;

public class UpdateLeaveRequestCommentValidator : AbstractValidator<UpdateLeaveRequestComment>
{
    public UpdateLeaveRequestCommentValidator()
    {
        RuleFor(e => e.Comment)
            .MaximumLength(Constants.MaxCommentLength);
    }
}
