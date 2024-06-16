using Api.Employees.Models;
using Api.LeaveRequests.Models;

namespace Api.ApprovalRequests.Models;

public record ApprovalRequest
{
    public int Id { get; init; }

    public required EmployeeBrief Approver { get; init; }

    public required LeaveRequest LeaveRequest { get; init; }

    public required string Status { get; init; }

    public string? Comment { get; init; }
}