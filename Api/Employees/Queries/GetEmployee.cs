using System.Security.Claims;

using Api.Common;
using Api.Common.Extensions;
using Api.Common.FluentResults;
using Api.Employees.Enums;
using Api.Employees.Models;

using AutoMapper;

using FluentResults;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.Employees.Queries;

public record GetEmployee(ClaimsPrincipal User, int Id) : IRequest<Result<EmployeeDetails>>;

public class GetEmployeeHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<GetEmployee, Result<EmployeeDetails>>
{
    public async Task<Result<EmployeeDetails>> Handle(GetEmployee request, CancellationToken cancellationToken)
    {
        var entity = await dbContext
            .Employees
            .Include(e => e.PeoplePartner)
            .Include(e => e.ManagedProjects)
            .Include(e => e.Projects)
            .Include(e => e.ApprovalRequests)
            .Include(e => e.LeaveRequests)
            .Include(e => e.Employees)
            .AsSplitQuery()
            .AsNoTracking()
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (entity is null)
        {
            return Result.Fail(new NotFoundResult("Employee"));
        }

        var position = request.User.GetPosition();
        var id = request.User.GetId();

        var hasAccess = position switch
        {
            EmployeePosition.Employee => false,
            EmployeePosition.HRManager => entity.PeoplePartnerId == id,
            EmployeePosition.ProjectManager => entity.Projects.Any(e => e.ProjectManagerId == id),
            EmployeePosition.Administrator => true,
            _ => throw new NotImplementedException(),
        };

        if (!hasAccess)
        {
            return Result.Fail(new ForbiddenResult());
        }

        return mapper.Map<EmployeeDetails>(entity);
    }
}
