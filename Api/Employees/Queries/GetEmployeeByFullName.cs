using Api.Common;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.Employees.Queries;

public record GetEmployeeByFullName(string FullName) : IRequest<Employee?>;

public class GetEmployeeByFullNameHandler(IApplicationDbContext dbContext) : IRequestHandler<GetEmployeeByFullName, Employee?>
{
    public async Task<Employee?> Handle(GetEmployeeByFullName request, CancellationToken cancellationToken)
    {
        return await dbContext.Employees.FirstOrDefaultAsync(e => e.FullName == request.FullName, cancellationToken);
    }
}