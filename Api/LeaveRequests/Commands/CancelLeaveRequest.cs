using System.Security.Claims;

using Api.ApprovalRequests.Enums;
using Api.Common;
using Api.Common.Extensions;
using Api.Common.FluentResults;
using Api.LeaveRequests.Enums;

using FluentResults;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.LeaveRequests.Commands;

public record CancelLeaveRequest(ClaimsPrincipal User, int Id) : IRequest<Result>;

public class CancelLeaveRequestHandler(IApplicationDbContext dbContext) : IRequestHandler<CancelLeaveRequest, Result>
{
    public async Task<Result> Handle(CancelLeaveRequest request, CancellationToken cancellationToken)
    {
        var leaveRequest = await dbContext
            .LeaveRequests
            .Include(e => e.ApprovalRequests)
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (leaveRequest is null)
        {
            return Result.Fail(new NotFoundResult("LeaveRequest", request.Id));
        }

        var userId = request.User.GetId();

        if (leaveRequest.EmployeeId != userId)
        {
            return Result.Fail(new ForbiddenResult("LeaveRequest", request.Id));
        }

        leaveRequest.Status = LeaveRequestStatus.Canceled;

        foreach (var approvalRequest in leaveRequest.ApprovalRequests)
        {
            approvalRequest.Status = ApprovalRequestStatus.Canceled;
        }

        await dbContext.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}
