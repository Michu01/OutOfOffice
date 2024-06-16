namespace Api.LeaveRequests.Models;

public record CreateLeaveRequest(
    string AbsenceReason,
    DateTime StartDate,
    DateTime EndDate,
    string? Comment);
