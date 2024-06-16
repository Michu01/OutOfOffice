using Api.ApprovalRequests.Models;
using Api.Employees.Models;

namespace Api.LeaveRequests.Models;

public record LeaveRequestDetails
{
    public int Id { get; init; }

    public required EmployeeBrief Employee { get; init; }

    public required string AbsenceReason { get; init; }

    public DateTime StartDate { get; init; }

    public DateTime EndDate { get; init; }

    public string? Comment { get; init; }

    public required string Status { get; init; }

    public required ICollection<LeaveRequestApprovalRequest> ApprovalRequests { get; init; }
}
