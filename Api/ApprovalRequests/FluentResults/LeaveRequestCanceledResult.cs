using Api.Common.FluentResults;

namespace Api.ApprovalRequests.FluentResults;

public class LeaveRequestCanceledResult() : BadRequestResult($"Related leave request has been canceled");
