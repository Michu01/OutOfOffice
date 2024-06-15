using System.Linq.Expressions;
using System.Security.Claims;

using Api.Common;
using Api.Common.Extensions;
using Api.Employees.Enums;
using Api.Projects.Enums;
using Api.Projects.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.Projects.Queries;

public enum Sort
{
    Newest, Oldest, Shortest, Longest
}

public record GetProjects(
    ClaimsPrincipal User,
    int Page = 1,
    int Limit = 30,
    string? Status = null, 
    string? Type = null,
    int? ProjectManagerId = null,
    bool Active = false,
    bool Finished = false,
    Sort Sort = Sort.Newest) : 
    IRequest<PaginatedResult<Project>>;

public class GetProjectsHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<GetProjects, PaginatedResult<Project>>
{
    public async Task<PaginatedResult<Project>> Handle(GetProjects request, CancellationToken cancellationToken)
    {
        var position = request.User.GetPosition();
        var id = request.User.GetId();

        IQueryable<ProjectEntity> query;

        switch (position)
        {
            case EmployeePosition.Administrator:
                query = dbContext.Projects;
                break;
            case EmployeePosition.HRManager:
                {
                    query = dbContext
                        .Employees
                        .Where(e => e.PeoplePartnerId == id)
                        .SelectMany(e => e.Projects);
                    break;
                }

            case EmployeePosition.ProjectManager:
                {
                    query = dbContext
                        .Employees
                        .Where(e => e.Id == id)
                        .SelectMany(e => e.ManagedProjects);
                    break;
                }

            case EmployeePosition.Employee:
                {
                    query = dbContext
                        .Employees
                        .Where(e => e.Id == id)
                        .SelectMany(e => e.Projects);
                    break;
                }

            default:
                throw new NotImplementedException();
        }

        query = query
            .Include(e => e.ProjectManager)
            .AsNoTracking();

        if (!string.IsNullOrEmpty(request.Type))
        {
            query = query.Where(e => e.Type == request.Type);
        }

        if (request.ProjectManagerId is not null)
        {
            query = query.Where(e => e.ProjectManagerId == request.ProjectManagerId);
        }

        if (request.Finished)
        {
            query = query.Where(e => e.EndDate != null);
        }

        if (request.Active)
        {
            query = query.Where(e => e.Status == ProjectStatus.Active);
        }

        Expression<Func<ProjectEntity, int?>> getDurationInDays = e => e.EndDate == null ? null : e.EndDate.Value.DayNumber - e.StartDate.DayNumber;

        query = request.Sort switch
        {
            Sort.Shortest => query.OrderBy(getDurationInDays),
            Sort.Longest => query.OrderByDescending(getDurationInDays),
            Sort.Oldest => query.OrderBy(e => e.StartDate),
            Sort.Newest => query.OrderByDescending(e => e.StartDate),
            _ => throw new NotImplementedException()
        };

        var result = await query
            .ProjectTo<Project>(mapper.ConfigurationProvider)
            .ToPaginatedResult(request.Page, request.Limit, cancellationToken);

        return result;
    }
}
