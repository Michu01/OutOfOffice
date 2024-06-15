using Api.Common;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.Employees.Queries;

public record GetProjectManagerExists(int Id) : IRequest<bool>;

public class GetProjectManagerExistsHandler(IApplicationDbContext dbContext) : IRequestHandler<GetProjectManagerExists, bool>
{
    public async Task<bool> Handle(GetProjectManagerExists request, CancellationToken cancellationToken)
    {
        return await dbContext.Employees.AnyAsync(e => e.Id == request.Id && e.Position == EmployeePosition.ProjectManager, cancellationToken);
    }
}
