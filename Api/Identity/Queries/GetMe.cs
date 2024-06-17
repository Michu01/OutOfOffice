using System.Security.Claims;

using Api.Common;
using Api.Common.Extensions;
using Api.Common.FluentResults;
using Api.Employees.Models;

using AutoMapper;

using FluentResults;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Api.Identity.Queries;

public record GetMe(ClaimsPrincipal User) : IRequest<Result<Employee>>;

public class GetMeHandler(IApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<GetMe, Result<Employee>>
{
    public async Task<Result<Employee>> Handle(GetMe request, CancellationToken cancellationToken)
    {
        var userId = request.User.GetId();

        var employee = await dbContext
            .Employees
            .SingleOrDefaultAsync(e => e.Id == userId, cancellationToken);

        if (employee is null)
        {
            return Result.Fail(new NotFoundResult("Employee"));
        }

        return mapper.Map<Employee>(employee);
    }
}
