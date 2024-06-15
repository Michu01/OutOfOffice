using Api.Projects.Models;

using AutoMapper;

namespace Api.Projects;

public class ProjectMapperProfile : Profile
{
    public ProjectMapperProfile()
    {
        CreateMap<CreateProject, ProjectEntity>();

        CreateMap<ProjectEntity, Project>();
        CreateMap<ProjectEntity, ProjectBrief>();
        CreateMap<ProjectEntity, ProjectDetails>();
    }
}
