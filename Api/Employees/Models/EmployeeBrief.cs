using Api.Employees.Enums;

namespace Api.Employees.Models;

public record EmployeeBrief
{
    public int Id { get; init; }

    public required string FullName { get; init; }

    public required string Subdivision { get; init; }

    public EmployeePosition Position { get; init; }

    public EmployeeStatus Status { get; init; }

    public int OutOfOfficeBalance { get; init; }
}
