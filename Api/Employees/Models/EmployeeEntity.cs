using System.ComponentModel.DataAnnotations;
using Api.ApprovalRequests.Models;
using Api.Employees.Enums;
using Api.LeaveRequests.Models;
using Api.Projects.Models;

namespace Api.Employees.Models;

public class EmployeeEntity
{
    public int Id { get; init; }

    [MaxLength(Constants.MaxFullNameLength)]
    public required string FullName { get; set; }

    [MaxLength(Constants.MaxSubdivisionLength)]
    public required string Subdivision { get; set; }

    public required EmployeePosition Position { get; set; }

    public required EmployeeStatus Status { get; set; }

    public int? PeoplePartnerId { get; set; }

    public virtual EmployeeEntity? PeoplePartner { get; set; }

    public int OutOfOfficeBalance { get; set; }

    public virtual ICollection<LeaveRequestEntity> LeaveRequests { get; init; } = [];

    public virtual ICollection<ApprovalRequestEntity> ApprovalRequests { get; init; } = [];

    public virtual ICollection<ProjectEntity> Projects { get; init; } = [];

    public virtual ICollection<ProjectEntity> ManagedProjects { get; init; } = [];

    public virtual ICollection<EmployeeEntity> Employees { get; init; } = [];
}
