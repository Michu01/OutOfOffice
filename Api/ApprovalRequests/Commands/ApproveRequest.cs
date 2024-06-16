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

public record ApproveRequest(ClaimsPrincipal User, int Id) : IRequest<Result>;

public class ApproveRequestHandler(IApplicationDbContext dbContext) : IRequestHandler<ApproveRequest, Result>
{
    private static Result ValidateRequest(ApprovalRequestEntity approvalRequest, ApproveRequest request)
    {
        var userId = request.User.GetId();

        if (approvalRequest.ApproverId != userId)
        {
            return Result.Fail(new ForbiddenResult("ApprovalRequest", request.Id));
        }

        if (approvalRequest.Status == ApprovalRequestStatus.Approved)
        {
            return Result.Fail(new AlreadyApprovedResult());
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

        var employee = leaveRequest.Employee!;

        var requestedDays = leaveRequest.EndDate.DayNumber - leaveRequest.StartDate.DayNumber + 1;
        var availableDays = employee.OutOfOfficeBalance;

        if (requestedDays > availableDays)
        {
            return Result.Fail(new NotEnoughOutOfOfficeDaysAvailable(requestedDays, availableDays));
        }

        return Result.Ok();
    }

    private static void UpdateRequest(ApprovalRequestEntity approvalRequest)
    {
        approvalRequest.Status = ApprovalRequestStatus.Approved;

        var leaveRequest = approvalRequest.LeaveRequest!;

        var approvalRequests = leaveRequest.ApprovalRequests;

        if (leaveRequest.Status != LeaveRequestStatus.Approved &&
            approvalRequests.All(e => e.Status == ApprovalRequestStatus.Approved))
        {
            leaveRequest.Status = LeaveRequestStatus.Approved;

            var requestedDays = leaveRequest.EndDate.DayNumber - leaveRequest.StartDate.DayNumber + 1;

            leaveRequest.Employee!.OutOfOfficeBalance -= requestedDays;
        }
    }

    public async Task<Result> Handle(ApproveRequest request, CancellationToken cancellationToken)
    {
        var approvalRequest = await dbContext
            .ApprovalRequests
            .Include(e => e.LeaveRequest)
            .ThenInclude(e => e!.ApprovalRequests)
            .Include(e => e.LeaveRequest)
            .ThenInclude(e => e!.Employee)
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (approvalRequest is null)
        {
            return Result.Fail(new NotFoundResult("ApprovalRequest", request.Id));
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