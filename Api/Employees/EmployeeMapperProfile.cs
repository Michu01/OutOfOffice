using Api.Employees.Models;

using AutoMapper;

namespace Api.Employees;

public class EmployeeMapperProfile : Profile
{
    public EmployeeMapperProfile()
    {
        CreateMap<CreateEmployee, EmployeeEntity>();

        CreateMap<EmployeeEntity, Employee>();
        CreateMap<EmployeeEntity, EmployeeBrief>();
        CreateMap<EmployeeEntity, EmployeeDetails>();
    }
}
