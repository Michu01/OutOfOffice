using System.Security.Claims;

using Api.Common;
using Api.Common.Extensions;
using Api.Common.FluentResults;
using Api.Employees.Enums;

using FluentResults;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.LeaveRequests.Commands;

public record UpdateLeaveRequestComment(ClaimsPrincipal User, int Id, string? Comment) : IRequest<Result>;

public class UpdateLeaveRequestCommentHandler(IApplicationDbContext dbContext) : IRequestHandler<UpdateLeaveRequestComment, Result>
{
    public async Task<Result> Handle(UpdateLeaveRequestComment request, CancellationToken cancellationToken)
    {
        var entity = await dbContext
            .LeaveRequests
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (entity is null)
        {
            return Result.Fail(new NotFoundResult("Leave request"));
        }

        var userId = request.User.GetId();
        var position = request.User.GetPosition();

        if (position != EmployeePosition.Administrator && userId != entity.EmployeeId)
        {
            return Result.Fail(new ForbiddenResult());
        }

        entity.Comment = request.Comment;

        await dbContext.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}
