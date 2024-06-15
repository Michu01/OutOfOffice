using Api.Common;
using Api.Employees.Models;
using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.Employees.Queries;

public record GetEmployeeByFullName(string FullName) : IRequest<EmployeeEntity?>;

public class GetEmployeeByFullNameHandler(IApplicationDbContext dbContext) : IRequestHandler<GetEmployeeByFullName, EmployeeEntity?>
{
    public async Task<EmployeeEntity?> Handle(GetEmployeeByFullName request, CancellationToken cancellationToken)
    {
        return await dbContext.Employees.FirstOrDefaultAsync(e => e.FullName == request.FullName, cancellationToken);
    }
}