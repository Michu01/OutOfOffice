using Api.Employees.Models;

namespace Api.LeaveRequests.Models;

public record LeaveRequest
{
    public int Id { get; init; }

    public required EmployeeBrief Employee { get; init; }

    public required string AbsenceReason { get; init; }

    public DateOnly StartDate { get; init; }

    public DateOnly EndDate { get; init; }

    public string? Comment { get; init; }

    public required string Status { get; init; }
}
