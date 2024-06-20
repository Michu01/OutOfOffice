using System.Security.Claims;

using Api.ApprovalRequests.Models;
using Api.Common;
using Api.Common.Extensions;
using Api.Common.FluentResults;
using Api.Employees.Enums;

using AutoMapper;

using FluentResults;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.ApprovalRequests.Queries;

public record GetApprovalRequest(ClaimsPrincipal User, int Id) : IRequest<Result<ApprovalRequest>>;

public class GetApprovalRequestHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<GetApprovalRequest, Result<ApprovalRequest>>
{
    public async Task<Result<ApprovalRequest>> Handle(GetApprovalRequest request, CancellationToken cancellationToken)
    {
        var approvalRequest = await dbContext
            .ApprovalRequests
            .Include(e => e.Approver)
            .Include(e => e.LeaveRequest!)
            .ThenInclude(e => e.Employee)
            .AsSplitQuery()
            .AsNoTracking()
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (approvalRequest is null)
        {
            return Result.Fail(new NotFoundResult("Approval request"));
        }

        var position = request.User.GetPosition();
        var userId = request.User.GetId();

        var hasAccess = position switch
        {
            EmployeePosition.Employee => approvalRequest.LeaveRequest!.EmployeeId == userId,
            EmployeePosition.HRManager or EmployeePosition.ProjectManager => approvalRequest.ApproverId == userId,
            EmployeePosition.Administrator => true,
            _ => throw new NotImplementedException(),
        };

        if (!hasAccess)
        {
            return Result.Fail(new ForbiddenResult());
        }

        return mapper.Map<ApprovalRequest>(approvalRequest);
    }
}