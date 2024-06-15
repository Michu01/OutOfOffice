using System.ComponentModel.DataAnnotations;

using Api.ApprovalRequests;
using Api.LeaveRequests;

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
}
