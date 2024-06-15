using Api.Common;

using AutoMapper;

using MediatR;

namespace Api.Employees.Commands;

public record AddEmployee(CreateEmployee Employee) : IRequest<Employee>;

public class AddEmployeeHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<AddEmployee, Employee>
{
    public async Task<Employee> Handle(AddEmployee request, CancellationToken cancellationToken)
    {
        var entity = mapper.Map<Employee>(request.Employee);

        dbContext.Employees.Add(entity);

        await dbContext.SaveChangesAsync(cancellationToken);

        return entity;
    }
}