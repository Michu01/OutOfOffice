using Api.Employees.Enums;
using Api.Employees.Models;

using AutoMapper;

namespace Api.Employees;

public class EmployeeMapperProfile : Profile
{
    public EmployeeMapperProfile()
    {
        CreateMap<CreateEmployee, EmployeeEntity>()
            .ForMember(e => e.Position, e => e
                .MapFrom(e => EmployeePosition.Employee))
            .ForMember(e => e.PeoplePartnerId, e => e
                .MapFrom((_, entity, _, context) =>
                {
                    return context.TryGetItems(out var items) && items.TryGetValue(nameof(EmployeeEntity.PeoplePartnerId), out var value)
                        ? value
                        : entity.PeoplePartnerId;
                }));

        CreateMap<EmployeeEntity, Employee>();
        CreateMap<EmployeeEntity, EmployeeBrief>();
        CreateMap<EmployeeEntity, EmployeeDetails>();
    }
}
