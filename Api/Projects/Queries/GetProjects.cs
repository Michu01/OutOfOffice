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
    StartDateAsc, 
    StartDateDesc,
    EndDateAsc,
    EndDateDesc,
    IdAsc,
    IdDesc,
    NameAsc,
    NameDesc
}

public record GetProjects(
    ClaimsPrincipal User,
    int Page = 1,
    int Limit = 30,
    int? Id = null,
    string? Name = null,
    string? Type = null,
    ProjectStatus? Status = null, 
    int? ProjectManagerId = null,
    bool Finished = false,
    Sort Sort = Sort.StartDateDesc) : 
    IRequest<PaginatedResult<Project>>;

public class GetProjectsHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<GetProjects, PaginatedResult<Project>>
{
    public async Task<PaginatedResult<Project>> Handle(GetProjects request, CancellationToken cancellationToken)
    {
        var position = request.User.GetPosition();
        var userId = request.User.GetId();

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
                        .Where(e => e.PeoplePartnerId == userId)
                        .SelectMany(e => e.Projects)
                        .Distinct();
                    break;
                }

            case EmployeePosition.ProjectManager:
                {
                    query = dbContext
                        .Employees
                        .Where(e => e.Id == userId)
                        .SelectMany(e => e.ManagedProjects);
                    break;
                }

            case EmployeePosition.Employee:
                {
                    query = dbContext
                        .Employees
                        .Where(e => e.Id == userId)
                        .SelectMany(e => e.Projects);
                    break;
                }

            default:
                throw new NotImplementedException();
        }

        query = query
            .Include(e => e.ProjectManager)
            .AsNoTracking();

        if (request.Id is not null)
        {
            query = query.Where(e => e.Id == request.Id);
        }

        if (!string.IsNullOrEmpty(request.Name))
        {
            query = query.Where(e => e.Name.Contains(request.Name));
        }

        if (!string.IsNullOrEmpty(request.Type))
        {
            query = query.Where(e => e.Type.Contains(request.Type));
        }

        if (request.ProjectManagerId is not null)
        {
            query = query.Where(e => e.ProjectManagerId == request.ProjectManagerId);
        }

        if (request.Finished)
        {
            query = query.Where(e => e.EndDate != null);
        }

        if (request.Status is not null)
        {
            query = query.Where(e => e.Status == request.Status);
        }

        query = request.Sort switch
        {
            Sort.StartDateAsc => query.OrderBy(e => e.StartDate),
            Sort.StartDateDesc => query.OrderByDescending(e => e.StartDate),
            Sort.EndDateAsc => query.OrderBy(e => e.EndDate),
            Sort.EndDateDesc => query.OrderByDescending(e => e.EndDate),
            Sort.IdAsc => query.OrderBy(e => e.Id),
            Sort.IdDesc => query.OrderByDescending(e => e.Id),
            Sort.NameAsc => query.OrderBy(e => e.Name),
            Sort.NameDesc => query.OrderByDescending(e => e.Name),
            _ => throw new NotImplementedException()
        };

        var result = await query
            .ProjectTo<Project>(mapper.ConfigurationProvider)
            .ToPaginatedResult(request.Page, request.Limit, cancellationToken);

        return result;
    }
}
