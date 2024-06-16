using System.Security.Claims;

using Api.Common.FluentResults;
using Api.Employees.Queries;

using FluentResults;

using MediatR;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Api.Identity.Commands;

public record SignIn(HttpContext HttpContext, string FullName) : IRequest<Result>;

public class SignInHandler(IMediator mediator) : IRequestHandler<SignIn, Result>
{
    public async Task<Result> Handle(SignIn request, CancellationToken cancellationToken)
    {
        var employee = await mediator.Send(new GetEmployeeByFullName(request.FullName), cancellationToken); 

        if (employee is null)
        {
            return Result.Fail(new NotFoundResult("Employee"));
        }

        var claims = new List<Claim>
        {
            new("Id", employee.Id.ToString()),
            new(ClaimTypes.Name, employee.FullName),
            new(ClaimTypes.Role, employee.Position.ToString()),
            new("PeoplePartnerId", employee.PeoplePartnerId.ToString() ?? "")
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        var authProperties = new AuthenticationProperties
        {
            AllowRefresh = true,
            IsPersistent = true,
            ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(15),
            IssuedUtc = DateTimeOffset.UtcNow
        };

        await request.HttpContext.SignInAsync(
            new ClaimsPrincipal(claimsIdentity),
            authProperties);

        return Result.Ok();
    }
}
