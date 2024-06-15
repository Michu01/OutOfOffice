using Api.Common;

using AutoMapper;

using MediatR;

namespace Api.Projects.Commands;

public record AddProject(CreateProject Project) : IRequest<Project>;

public class AddProjectHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<AddProject, Project>
{
    public async Task<Project> Handle(AddProject request, CancellationToken cancellationToken)
    {
        var entity = mapper.Map<Project>(request.Project);

        dbContext.Projects.Add(entity);

        await dbContext.SaveChangesAsync(cancellationToken);

        return entity;
    }
}