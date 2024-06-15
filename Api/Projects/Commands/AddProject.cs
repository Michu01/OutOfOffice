using Api.Common;
using Api.Projects.Models;
using AutoMapper;

using MediatR;

namespace Api.Projects.Commands;

public record AddProject(CreateProject Project) : IRequest<ProjectEntity>;

public class AddProjectHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<AddProject, ProjectEntity>
{
    public async Task<ProjectEntity> Handle(AddProject request, CancellationToken cancellationToken)
    {
        var entity = mapper.Map<ProjectEntity>(request.Project);

        dbContext.Projects.Add(entity);

        await dbContext.SaveChangesAsync(cancellationToken);

        return entity;
    }
}