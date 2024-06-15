using AutoMapper;

namespace Api.Employees;

public class CreateEmployeeMapperProfile : Profile
{
    public CreateEmployeeMapperProfile()
    {
        CreateMap<CreateEmployee, Employee>();
    }
}
