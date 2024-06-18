using System.Security.Claims;

using Api.Common;
using Api.Common.Extensions;
using Api.Common.FluentResults;
using Api.Employees.Enums;
using Api.Projects.Models;

using AutoMapper;

using FluentResults;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.Projects.Queries;

public record GetProject(ClaimsPrincipal User, int Id) : IRequest<Result<ProjectDetails>>;

public class GetProjectHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<GetProject, Result<ProjectDetails>>
{
    public async Task<Result<ProjectDetails>> Handle(GetProject request, CancellationToken cancellationToken)
    {
        var entity = await dbContext
            .Projects
            .Include(e => e.ProjectManager)
            .Include(e => e.Employees)
            .AsNoTracking()
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (entity is null)
        {
            return Result.Fail(new NotFoundResult("Project"));
        }

        var position = request.User.GetPosition();
        var id = request.User.GetId();

        var hasAccess = position switch
        {
            EmployeePosition.Employee => entity.Employees.Any(e => e.Id == id),
            EmployeePosition.HRManager => entity.Employees.Any(e => e.PeoplePartnerId == id),
            EmployeePosition.ProjectManager => entity.ProjectManagerId == id,
            EmployeePosition.Administrator => true,
            _ => throw new NotImplementedException(),
        };

        if (!hasAccess)
        {
            return Result.Fail(new ForbiddenResult());
        }

        return mapper.Map<ProjectDetails>(entity);
    }
}
