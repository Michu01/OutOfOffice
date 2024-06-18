using System.Security.Claims;

using Api.Common;
using Api.Common.Extensions;
using Api.ProjectEmployee;
using Api.Projects.Models;

using AutoMapper;

using MediatR;

namespace Api.Projects.Commands;

public record AddProject(ClaimsPrincipal User, CreateProject Project) : IRequest<ProjectBrief>;

public class AddProjectHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<AddProject, ProjectBrief>
{
    public async Task<ProjectBrief> Handle(AddProject request, CancellationToken cancellationToken)
    {
        var userId = request.User.GetId();

        var entity = mapper.Map<ProjectEntity>(
            request.Project,
            opts => opts.Items[nameof(ProjectEntity.ProjectManagerId)] = userId);

        dbContext.Projects.Add(entity);

        await dbContext.SaveChangesAsync(cancellationToken);

        return mapper.Map<ProjectBrief>(entity);
    }
}