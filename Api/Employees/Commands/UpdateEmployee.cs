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

namespace Api.Employees.Commands;

public record UpdateEmployee(ClaimsPrincipal User, int Id, CreateEmployee Employee) : IRequest<Result<EmployeeBrief>>;

public class UpdateEmployeeHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<UpdateEmployee, Result<EmployeeBrief>>
{
    public async Task<Result<EmployeeBrief>> Handle(UpdateEmployee request, CancellationToken cancellationToken)
    {
        var userId = request.User.GetId();
        var position = request.User.GetPosition();

        var entity = await dbContext
            .Employees
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (entity is null)
        {
            return Result.Fail(new NotFoundResult("Employee"));
        }

        if (position != EmployeePosition.Administrator && (position != EmployeePosition.HRManager || entity.PeoplePartnerId != userId))
        {
            return Result.Fail(new ForbiddenResult());
        }

        mapper.Map(request.Employee, entity);

        await dbContext.SaveChangesAsync(cancellationToken);

        return mapper.Map<EmployeeBrief>(entity);
    }
}