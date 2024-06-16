using System.Security.Claims;

using Api.ApprovalRequests.Enums;
using Api.ApprovalRequests.FluentResults;
using Api.ApprovalRequests.Models;
using Api.Common;
using Api.Common.Extensions;
using Api.Common.FluentResults;
using Api.Employees.Models;
using Api.LeaveRequests.Models;

using AutoMapper;

using FluentResults;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.LeaveRequests.Commands;

public record SubmitLeaveRequest(ClaimsPrincipal User, CreateLeaveRequest LeaveRequest) : IRequest<Result>;

public class SubmitLeaveRequestHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<SubmitLeaveRequest, Result>
{
    private async Task AddLeaveRequest(LeaveRequestEntity leaveRequest, EmployeeEntity employee, CancellationToken cancellationToken)
    {
        dbContext.LeaveRequests.Add(leaveRequest);

        var approvers = employee
            .Projects
            .Select(e => e.ProjectManager!)
            .Append(employee.PeoplePartner!);

        foreach (var approver in approvers)
        {
            var approvalRequest = new ApprovalRequestEntity
            {
                ApproverId = approver.Id,
                Status = ApprovalRequestStatus.New
            };

            leaveRequest.ApprovalRequests.Add(approvalRequest);
        }

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<Result> Handle(SubmitLeaveRequest request, CancellationToken cancellationToken)
    {
        var userId = request.User.GetId();

        var employee = await dbContext
            .Employees
            .Include(e => e.PeoplePartner)
            .Include(e => e.Projects)
            .ThenInclude(e => e.ProjectManager)
            .AsNoTracking()
            .SingleOrDefaultAsync(e => e.Id == userId, cancellationToken);

        if (employee is null)
        {
            return Result.Fail(new NotFoundResult("Employee", userId));
        }

        var requestedDays = (request.LeaveRequest.EndDate.Date - request.LeaveRequest.StartDate.Date).Days + 1;

        if (requestedDays > employee.OutOfOfficeBalance)
        {
            return Result.Fail(new NotEnoughOutOfOfficeDaysAvailable(requestedDays, employee.OutOfOfficeBalance));
        }

        var leaveRequest = mapper.Map<LeaveRequestEntity>(
            request.LeaveRequest,
            opts => opts.Items[nameof(LeaveRequestEntity.EmployeeId)] = userId);

        await AddLeaveRequest(leaveRequest, employee, cancellationToken);

        return Result.Ok();
    }
}
