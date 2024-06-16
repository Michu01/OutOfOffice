using Api.Common.FluentResults;

namespace Api.ApprovalRequests.FluentResults;

public class CanceledResult() : BadRequestResult($"Approval request has been canceled");
