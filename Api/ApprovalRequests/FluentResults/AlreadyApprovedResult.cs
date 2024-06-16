using Api.Common.FluentResults;

namespace Api.ApprovalRequests.FluentResults;

public class AlreadyApprovedResult() : BadRequestResult("Approval request has already been approved");
