using System.Linq.Expressions;

using Api.Common;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.Projects.Queries;

public record GetProjects(
    int Page = 1,
    int Limit = 30,
    string? Status = null, 
    string? Type = null,
    int? ProjectManagerId = null,
    bool Active = false,
    bool Finished = false,
    string Sort = "newest") : 
    IRequest<PaginatedResult<Project>>;

public class GetProjectsHandler(IApplicationDbContext dbContext) : IRequestHandler<GetProjects, PaginatedResult<Project>>
{
    public async Task<PaginatedResult<Project>> Handle(GetProjects request, CancellationToken cancellationToken)
    {
        var query = dbContext
            .Projects
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

        Expression<Func<Project, int?>> getDurationInDays = e => e.EndDate == null ? null : e.EndDate.Value.DayNumber - e.StartDate.DayNumber;

        query = request.Sort switch
        {
            "shortest" => query.OrderBy(getDurationInDays),
            "longest" => query.OrderByDescending(getDurationInDays),
            "oldest" => query.OrderBy(e => e.StartDate),
            _ => query.OrderByDescending(e => e.StartDate)
        };

        var result = await query.ToPaginatedResult(request.Page, request.Limit, cancellationToken);

        return result;
    }
}
