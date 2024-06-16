using System.Security.Claims;

using Api.Common;
using Api.Common.Extensions;
using Api.Employees.Enums;
using Api.LeaveRequests.Models;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.ApprovalRequests.Queries;

public record GetLeaveRequests(
    ClaimsPrincipal User,
    int Page = 1,
    int Limit = 30) :
    IRequest<PaginatedResult<LeaveRequest>>;

public class GetLeaveRequestsHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<GetLeaveRequests, PaginatedResult<LeaveRequest>>
{
    public async Task<PaginatedResult<LeaveRequest>> Handle(GetLeaveRequests request, CancellationToken cancellationToken)
    {
        var position = request.User.GetPosition();
        var id = request.User.GetId();

        IQueryable<LeaveRequestEntity> query;

        switch (position)
        {
            case EmployeePosition.Administrator:
                query = dbContext.LeaveRequests;
                break;
            case EmployeePosition.HRManager:
                {
                    query = dbContext
                        .Employees
                        .Where(e => e.PeoplePartnerId == id)
                        .SelectMany(e => e.LeaveRequests);
                    break;
                }

            case EmployeePosition.ProjectManager:
                {
                    query = dbContext
                        .Projects
                        .Where(e => e.ProjectManagerId == id)
                        .SelectMany(e => e.Employees)
                        .SelectMany(e => e.LeaveRequests);
                    break;
                }

            case EmployeePosition.Employee:
                {
                    query = dbContext
                        .Employees
                        .Where(e => e.Id == id)
                        .SelectMany(e => e.LeaveRequests);
                    break;
                }

            default:
                throw new NotImplementedException();
        }

        query = query
            .Include(e => e.Employee)
            .AsNoTracking();

        var result = await query
            .OrderBy(e => e.Id)
            .ProjectTo<LeaveRequest>(mapper.ConfigurationProvider)
            .ToPaginatedResult(request.Page, request.Limit, cancellationToken);

        return result;
    }
}