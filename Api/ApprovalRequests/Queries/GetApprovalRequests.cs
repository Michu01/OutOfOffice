using System.Security.Claims;

using Api.ApprovalRequests.Enums;
using Api.ApprovalRequests.Models;
using Api.Common;
using Api.Common.Extensions;
using Api.Employees.Enums;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.ApprovalRequests.Queries;

public enum Sort
{
    StartDateAsc,
    StartDateDesc,
    EndDateAsc,
    EndDateDesc,
    IdAsc,
    IdDesc
}

public record GetApprovalRequests(
    ClaimsPrincipal User,
    int Page = 1,
    int Limit = 30,
    string? AbsenceReason = null,
    ApprovalRequestStatus? Status = null,
    Sort Sort = Sort.StartDateDesc) : 
    IRequest<PaginatedResult<ApprovalRequest>>;

public class GetApprovalRequestsHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<GetApprovalRequests, PaginatedResult<ApprovalRequest>>
{
    public async Task<PaginatedResult<ApprovalRequest>> Handle(GetApprovalRequests request, CancellationToken cancellationToken)
    {
        var position = request.User.GetPosition();
        var id = request.User.GetId();

        IQueryable<ApprovalRequestEntity> query;

        switch (position)
        {
            case EmployeePosition.Administrator:
                query = dbContext.ApprovalRequests;
                break;
            case EmployeePosition.HRManager:
            case EmployeePosition.ProjectManager:
                {
                    query = dbContext
                        .ApprovalRequests
                        .Where(e => e.ApproverId == id);
                    break;
                }

            default:
                throw new NotImplementedException();
        }

        query = query
            .Include(e => e.Approver)
            .Include(e => e.LeaveRequest)
            .AsNoTracking();

        if (request.Status is not null)
        {
            query = query.Where(e => e.Status == request.Status);
        }

        if (!string.IsNullOrEmpty(request.AbsenceReason))
        {
            query = query.Where(e => e.LeaveRequest!.AbsenceReason.Contains(request.AbsenceReason));
        }

        query = request.Sort switch
        {
            Sort.StartDateAsc => query.OrderBy(e => e.LeaveRequest!.StartDate),
            Sort.StartDateDesc => query.OrderByDescending(e => e.LeaveRequest!.StartDate),
            Sort.EndDateAsc => query.OrderBy(e => e.LeaveRequest!.EndDate),
            Sort.EndDateDesc => query.OrderByDescending(e => e.LeaveRequest!.EndDate),
            Sort.IdAsc => query.OrderBy(e => e.Id),
            Sort.IdDesc => query.OrderByDescending(e => e.Id),
            _ => throw new NotImplementedException(),
        };

        var result = await query
            .ProjectTo<ApprovalRequest>(mapper.ConfigurationProvider)
            .ToPaginatedResult(request.Page, request.Limit, cancellationToken);

        return result;
    }
}