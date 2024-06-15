namespace Api.ApprovalRequests.Models;

public record ApprovalRequestBrief
{
    public int Id { get; init; }

    public required string Status { get; init; }

    public string? Comment { get; init; }
}
