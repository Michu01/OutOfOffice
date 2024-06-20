using System.Security.Claims;

using Api.Common;
using Api.Common.Extensions;
using Api.Common.FluentResults;
using Api.Employees.Enums;

using FluentResults;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.ApprovalRequests.Commands;

public record UpdateApprovalRequestComment(ClaimsPrincipal User, int Id, string? Comment) : IRequest<Result>;

public class UpdateApprovalRequestCommentHandler(IApplicationDbContext dbContext) : IRequestHandler<UpdateApprovalRequestComment, Result>
{
    public async Task<Result> Handle(UpdateApprovalRequestComment request, CancellationToken cancellationToken)
    {
        var entity = await dbContext
            .ApprovalRequests
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (entity is null)
        {
            return Result.Fail(new NotFoundResult("Approval request"));
        }

        var userId = request.User.GetId();
        var position = request.User.GetPosition();

        if (position != EmployeePosition.Administrator && userId != entity.ApproverId)
        {
            return Result.Fail(new ForbiddenResult());
        }

        entity.Comment = request.Comment;

        await dbContext.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}

