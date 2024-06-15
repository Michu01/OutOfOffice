using Api.Common;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.Employees.Queries;

public record GetHRManagerExists(int Id) : IRequest<bool>;

public class GetHRManagerExistsHandler(IApplicationDbContext dbContext) : IRequestHandler<GetHRManagerExists, bool>
{
    public async Task<bool> Handle(GetHRManagerExists request, CancellationToken cancellationToken)
    {
        return await dbContext.Employees.AnyAsync(e => e.Id == request.Id && e.Position == EmployeePosition.HRManager, cancellationToken);
    }
}
