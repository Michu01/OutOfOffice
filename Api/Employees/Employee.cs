using System.ComponentModel.DataAnnotations;

using Api.ApprovalRequests;
using Api.LeaveRequests;
using Api.Projects;

namespace Api.Employees;

public class Employee
{
    public int Id { get; init; }

    [MaxLength(Constants.MaxFullNameLength)]
    public required string FullName { get; set; }

    [MaxLength(Constants.MaxSubdivisionLength)]
    public required string Subdivision { get; set; }

    public required EmployeePosition Position { get; set; }

    public required EmployeeStatus Status { get; set; }

    public int? PeoplePartnerId { get; set; }

    public virtual Employee? PeoplePartner { get; set; }

    public int OutOfOfficeBalance { get; set; }

    public virtual ICollection<LeaveRequest> LeaveRequests { get; init; } = [];

    public virtual ICollection<ApprovalRequest> ApprovalRequests { get; init; } = [];

    public virtual ICollection<Project> Projects { get; init; } = [];

    public virtual ICollection<Project> ManagedProjects { get; init; } = [];

    public virtual ICollection<Employee> Employees { get; init; } = [];
}
