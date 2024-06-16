using System.Security.Claims;

using Api.ApprovalRequests.Enums;
using Api.ApprovalRequests.FluentResults;
using Api.ApprovalRequests.Models;
using Api.Common;
using Api.Common.Extensions;
using Api.Common.FluentResults;
using Api.LeaveRequests.Enums;

using FluentResults;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.ApprovalRequests.Commands;

public record RejectRequest(ClaimsPrincipal User, int Id) : IRequest<Result>;

public class RejectRequestHandler(IApplicationDbContext dbContext) : IRequestHandler<ApproveRequest, Result>
{
    private static Result ValidateRequest(ApprovalRequestEntity approvalRequest, ApproveRequest request)
    {
        var userId = request.User.GetId();

        if (approvalRequest.ApproverId != userId)
        {
            return Result.Fail(new ForbiddenResult());
        }

        if (approvalRequest.Status == ApprovalRequestStatus.Rejected)
        {
            return Result.Fail(new AlreadyRejectedResult());
        }

        if (approvalRequest.Status == ApprovalRequestStatus.Canceled)
        {
            return Result.Fail(new CanceledResult());
        }

        var leaveRequest = approvalRequest.LeaveRequest!;

        if (leaveRequest.Status == LeaveRequestStatus.Canceled)
        {
            return Result.Fail(new LeaveRequestCanceledResult());
        }

        return Result.Ok();
    }

    private static void UpdateRequest(ApprovalRequestEntity approvalRequest)
    {
        approvalRequest.Status = ApprovalRequestStatus.Rejected;

        var leaveRequest = approvalRequest.LeaveRequest!;

        if (leaveRequest.Status == LeaveRequestStatus.Approved)
        {
            var requestedDays = leaveRequest.EndDate.DayNumber - leaveRequest.StartDate.DayNumber + 1;

            leaveRequest.Employee!.OutOfOfficeBalance += requestedDays;
        }

        leaveRequest.Status = LeaveRequestStatus.Rejected;
    }

    public async Task<Result> Handle(ApproveRequest request, CancellationToken cancellationToken)
    {
        var approvalRequest = await dbContext
            .ApprovalRequests
            .Include(e => e.LeaveRequest)
            .ThenInclude(e => e!.Employee)
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (approvalRequest is null)
        {
            return Result.Fail(new NotFoundResult("Approval request"));
        }

        var validationResult = ValidateRequest(approvalRequest, request);

        if (validationResult.IsFailed)
        {
            return validationResult;
        }

        UpdateRequest(approvalRequest);

        await dbContext.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}
