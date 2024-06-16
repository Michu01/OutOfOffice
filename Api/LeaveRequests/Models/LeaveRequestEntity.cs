using System.ComponentModel.DataAnnotations;

using Api.ApprovalRequests.Models;
using Api.Employees.Models;
using Api.LeaveRequests.Enums;

namespace Api.LeaveRequests.Models;

public class LeaveRequestEntity
{
    public int Id { get; init; }

    public int EmployeeId { get; init; }

    public virtual EmployeeEntity? Employee { get; init; }

    [MaxLength(Constants.MaxAbsenceReasonLength)]
    public required string AbsenceReason { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    [MaxLength(Constants.MaxCommentLength)]
    public string? Comment { get; set; }

    public required LeaveRequestStatus Status { get; set; }

    public virtual ICollection<ApprovalRequestEntity> ApprovalRequests { get; init; } = [];
}
