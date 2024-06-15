using Api.ApprovalRequests.Models;
using Api.Employees.Enums;
using Api.LeaveRequests.Models;
using Api.Projects.Models;

namespace Api.Employees.Models;

public record EmployeeDetails
{
    public int Id { get; init; }

    public required string FullName { get; init; }

    public required string Subdivision { get; init; }

    public EmployeePosition Position { get; init; }

    public EmployeeStatus Status { get; init; }

    public int OutOfOfficeBalance { get; init; }

    public required EmployeeBrief PeoplePartner { get; init; }

    public required IReadOnlyCollection<LeaveRequestBrief> LeaveRequests { get; init; }

    public required IReadOnlyCollection<ApprovalRequestBrief> ApprovalRequests { get; init; }

    public required IReadOnlyCollection<ProjectBrief> Projects { get; init; }

    public required IReadOnlyCollection<ProjectBrief> ManagedProjects { get; init; }

    public required IReadOnlyCollection<EmployeeBrief> Employees { get; init; }
}
