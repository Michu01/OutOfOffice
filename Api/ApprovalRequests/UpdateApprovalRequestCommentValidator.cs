using Api.ApprovalRequests.Commands;

using FluentValidation;

namespace Api.ApprovalRequests;

public class UpdateApprovalRequestCommentValidator : AbstractValidator<UpdateApprovalRequestComment>
{
    public UpdateApprovalRequestCommentValidator()
    {
        RuleFor(e => e.Comment)
            .MaximumLength(Constants.MaxCommentLength);
    }
}