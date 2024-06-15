using System.Security.Claims;
using Api.Employees.Enums;

namespace Api.Common.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static int GetId(this ClaimsPrincipal user)
    {
        var rawValue = user.FindFirstValue("Id")!;

        return int.Parse(rawValue);
    }

    public static EmployeePosition GetPosition(this ClaimsPrincipal user)
    {
        var rawValue = user.FindFirstValue(ClaimTypes.Role)!;

        return Enum.Parse<EmployeePosition>(rawValue);
    }
}
