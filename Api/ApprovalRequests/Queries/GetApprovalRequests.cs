using System.Security.Claims;

using Api.ApprovalRequests.Models;
using Api.Common;
using Api.Common.Extensions;
using Api.Employees.Enums;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.ApprovalRequests.Queries;

public record GetApprovalRequests(
    ClaimsPrincipal User,
    int Page = 1,
    int Limit = 30) : 
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

        var result = await query
            .OrderBy(e => e.Id)
            .ProjectTo<ApprovalRequest>(mapper.ConfigurationProvider)
            .ToPaginatedResult(request.Page, request.Limit, cancellationToken);

        return result;
    }
}