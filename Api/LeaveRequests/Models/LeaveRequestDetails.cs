using Api.Employees.Models;
using Api.LeaveRequests.Enums;

namespace Api.LeaveRequests.Models;

public record LeaveRequestDetails
{
    public int Id { get; init; }

    public required EmployeeBrief Employee { get; init; }

    public required string AbsenceReason { get; init; }

    public DateOnly StartDate { get; init; }

    public DateOnly EndDate { get; init; }

    public string? Comment { get; init; }

    public LeaveRequestStatus Status { get; init; }

    public required ICollection<LeaveRequestApprovalRequest> ApprovalRequests { get; init; }
}
