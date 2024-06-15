using Api.ApprovalRequests.Models;
using Api.Employees.Enums;
using Api.LeaveRequests.Models;
using Api.Projects.Models;

namespace Api.Employees.Models;

public record Employee
{
    public int Id { get; init; }

    public required string FullName { get; init; }

    public required string Subdivision { get; init; }

    public EmployeePosition Position { get; init; }

    public EmployeeStatus Status { get; init; }

    public int OutOfOfficeBalance { get; init; }

    public required EmployeeBrief PeoplePartner { get; init; }
}
