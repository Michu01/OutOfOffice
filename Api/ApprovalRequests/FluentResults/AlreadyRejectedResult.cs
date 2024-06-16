using Api.Common.FluentResults;

namespace Api.ApprovalRequests.FluentResults;

public class AlreadyRejectedResult() : BadRequestResult("Approval request has already been rejected");
