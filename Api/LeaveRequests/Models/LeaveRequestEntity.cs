using System.ComponentModel.DataAnnotations;
using Api.Employees.Models;

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

    [MaxLength(Constants.MaxStatusLength)]
    public required string Status { get; set; }
}
