using Api.ProjectEmployee;
using Api.Projects.Models;

using AutoMapper;

namespace Api.Projects;

public class ProjectMapperProfile : Profile
{
    public ProjectMapperProfile()
    {
        CreateMap<CreateProject, ProjectEntity>()
            .ForMember(e => e.ProjectManagerId, e => e
                .MapFrom((_, entity, _, context) =>
                {
                    return context.TryGetItems(out var items) && items.TryGetValue(nameof(ProjectEntity.ProjectManagerId), out var value)
                        ? value
                        : entity.ProjectManagerId;
                }))
            .ForMember(e => e.ProjectsEmployees, e => e
                .MapFrom(e => e.EmployeeIds.Select(e => new ProjectEmployeeEntity { EmployeeId = e }).ToArray()));

        CreateMap<ProjectEntity, Project>();
        CreateMap<ProjectEntity, ProjectBrief>();
        CreateMap<ProjectEntity, ProjectDetails>();
    }
}
