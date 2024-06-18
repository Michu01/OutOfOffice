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

namespace Api.Projects.Commands;

public record UpdateProject(ClaimsPrincipal User, int Id, CreateProject Project) : IRequest<Result<ProjectBrief>>;

public class UpdateProjectHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<UpdateProject, Result<ProjectBrief>>
{
    public async Task<Result<ProjectBrief>> Handle(UpdateProject request, CancellationToken cancellationToken)
    {
        var userId = request.User.GetId();
        var position = request.User.GetPosition();

        var entity = await dbContext
            .Projects
            .Include(e => e.ProjectsEmployees)
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (entity is null)
        {
            return Result.Fail(new NotFoundResult("Project"));
        }

        if (position != EmployeePosition.Administrator && (position != EmployeePosition.ProjectManager || entity.ProjectManagerId != userId))
        {
            return Result.Fail(new ForbiddenResult());
        }

        mapper.Map(request.Project, entity);

        await dbContext.SaveChangesAsync(cancellationToken);

        return mapper.Map<ProjectBrief>(entity);
    }
}
