namespace Api.LeaveRequests.Models;

public record LeaveRequestBrief
{
    public int Id { get; init; }

    public required string AbsenceReason { get; init; }

    public DateTime StartDate { get; init; }

    public DateTime EndDate { get; init; }

    public string? Comment { get; init; }

    public required string Status { get; init; }
}
