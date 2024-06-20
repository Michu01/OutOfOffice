using Api.LeaveRequests.Enums;

namespace Api.LeaveRequests.Models;

public record LeaveRequestBrief
{
    public int Id { get; init; }

    public required string AbsenceReason { get; init; }

    public DateOnly StartDate { get; init; }

    public DateOnly EndDate { get; init; }

    public string? Comment { get; init; }

    public LeaveRequestStatus Status { get; init; }
}
