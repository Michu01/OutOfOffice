using System.Security.Claims;

using Api.Common;
using Api.Common.Extensions;
using Api.Common.FluentResults;
using Api.Employees.Enums;
using Api.LeaveRequests.Models;

using AutoMapper;

using FluentResults;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.LeaveRequests.Queries;

public record GetLeaveRequest(ClaimsPrincipal User, int Id) : IRequest<Result<LeaveRequestDetails>>;

public class GetLeaveRequestHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<GetLeaveRequest, Result<LeaveRequestDetails>>
{
    public async Task<Result<LeaveRequestDetails>> Handle(GetLeaveRequest request, CancellationToken cancellationToken)
    {
        var leaveRequest = await dbContext
            .LeaveRequests
            .Include(e => e.Employee)
            .Include(e => e.ApprovalRequests)
            .ThenInclude(e => e.Approver)
            .AsSplitQuery()
            .AsNoTracking()
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (leaveRequest is null)
        {
            return Result.Fail(new NotFoundResult("Leave request"));
        }

        var position = request.User.GetPosition();
        var userId = request.User.GetId();

        var hasAccess = position switch
        {
            EmployeePosition.Employee => leaveRequest.EmployeeId == userId,
            EmployeePosition.HRManager => leaveRequest.Employee!.PeoplePartnerId == userId,
            EmployeePosition.ProjectManager => leaveRequest.ApprovalRequests.Select(e => e.ApproverId).Contains(userId),
            EmployeePosition.Administrator => true,
            _ => throw new NotImplementedException(),
        };

        if (!hasAccess)
        {
            return Result.Fail(new ForbiddenResult());
        }

        return mapper.Map<LeaveRequestDetails>(leaveRequest);
    }
}