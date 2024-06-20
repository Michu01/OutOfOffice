using Api.ApprovalRequests.Enums;
using Api.Employees.Models;

namespace Api.LeaveRequests.Models;

public record LeaveRequestApprovalRequest
{
    public int Id { get; init; }

    public required EmployeeBrief Approver { get; init; }

    public required ApprovalRequestStatus Status { get; init; }

    public string? Comment { get; init; }
}
