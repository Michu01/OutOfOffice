using System.Security.Claims;

using Api.Common;
using Api.Common.Extensions;
using Api.Employees.Models;

using AutoMapper;

using MediatR;

namespace Api.Employees.Commands;

public record AddEmployee(ClaimsPrincipal User, CreateEmployee Employee) : IRequest<EmployeeBrief>;

public class AddEmployeeHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<AddEmployee, EmployeeBrief>
{
    public async Task<EmployeeBrief> Handle(AddEmployee request, CancellationToken cancellationToken)
    {
        var userId = request.User.GetId();

        var entity = mapper.Map<EmployeeEntity>(
            request.Employee,
            opts => opts.Items[nameof(EmployeeEntity.PeoplePartnerId)] = userId);

        dbContext.Employees.Add(entity);

        await dbContext.SaveChangesAsync(cancellationToken);

        return mapper.Map<EmployeeBrief>(entity);
    }
}