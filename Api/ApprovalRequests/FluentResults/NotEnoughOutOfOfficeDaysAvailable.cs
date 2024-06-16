using Api.Common.FluentResults;

namespace Api.ApprovalRequests.FluentResults;

public class NotEnoughOutOfOfficeDaysAvailable(int requestedDays, int availableDays) : 
    BadRequestResult($"Requested leave has a duration of {requestedDays} but employee has only {availableDays} days available");
