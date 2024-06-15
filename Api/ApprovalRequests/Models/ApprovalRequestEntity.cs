using System.ComponentModel.DataAnnotations;
using Api.Employees.Models;
using Api.LeaveRequests.Models;

namespace Api.ApprovalRequests.Models;

public class ApprovalRequestEntity
{
    public int Id { get; init; }

    public int ApproverId { get; init; }

    public virtual EmployeeEntity? Approver { get; init; }

    public int LeaveRequestId { get; init; }

    public virtual LeaveRequestEntity? LeaveRequest { get; init; }

    [MaxLength(Constants.MaxStatusLength)]
    public required string Status { get; set; }

    [MaxLength(Constants.MaxCommentLength)]
    public string? Comment { get; set; }
}
