using System.ComponentModel.DataAnnotations;

using Api.ApprovalRequests.Enums;
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

    public ApprovalRequestStatus Status { get; set; }

    [MaxLength(Constants.MaxCommentLength)]
    public string? Comment { get; set; }
}
