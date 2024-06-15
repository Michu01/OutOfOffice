using Api.Common;
using Api.Employees.Models;
using AutoMapper;

using MediatR;

namespace Api.Employees.Commands;

public record AddEmployee(CreateEmployee Employee) : IRequest<EmployeeEntity>;

public class AddEmployeeHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<AddEmployee, EmployeeEntity>
{
    public async Task<EmployeeEntity> Handle(AddEmployee request, CancellationToken cancellationToken)
    {
        var entity = mapper.Map<EmployeeEntity>(request.Employee);

        dbContext.Employees.Add(entity);

        await dbContext.SaveChangesAsync(cancellationToken);

        return entity;
    }
}