using System.ComponentModel.DataAnnotations;

using Api.Employees;
using Api.LeaveRequests;

namespace Api.ApprovalRequests;

public class ApprovalRequest
{
    public int Id { get; init; }

    public int ApproverId { get; init; }

    public virtual Employee? Approver { get; init; }

    public int LeaveRequestId { get; init; }

    public virtual LeaveRequest? LeaveRequest { get; init; }

    [MaxLength(Constants.MaxStatusLength)]
    public required string Status { get; set; }

    [MaxLength(Constants.MaxCommentLength)]
    public string? Comment { get; set; }
}
