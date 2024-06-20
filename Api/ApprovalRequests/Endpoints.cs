using System.Security.Claims;

using Api.ApprovalRequests.Commands;
using Api.ApprovalRequests.Queries;
using Api.Common.Extensions;
using Api.Identity;

using FluentValidation;

using MediatR;

namespace Api.ApprovalRequests;

public static class Endpoints
{
    public static void MapApprovalRequestEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder
            .MapGroup("approvalRequests")
            .WithTags("ApprovalRequests");

        group
            .MapGet(string.Empty, GetApprovalRequests)
            .RequireAuthorization(nameof(Policy.ViewApprovalRequests));

        group
            .MapGet("{id}", GetApprovalRequest)
            .RequireAuthorization(nameof(Policy.ViewApprovalRequests));

        group
            .MapPut("{id}/approve", ApproveRequest)
            .RequireAuthorization(nameof(Policy.ManageApprovalRequests));

        group
            .MapPut("{id}/reject", RejectRequest)
            .RequireAuthorization(nameof(Policy.ManageApprovalRequests));

        group
            .MapPut("{id}/updateComment", UpdateComment)
            .RequireAuthorization(nameof(Policy.ManageApprovalRequests));
    }

    private static async Task<IResult> GetApprovalRequests(IMediator mediator, [AsParameters] GetApprovalRequests request)
    {
        var result = await mediator.Send(request);

        return Results.Ok(result);
    }

    private static async Task<IResult> GetApprovalRequest(IMediator mediator, [AsParameters] GetApprovalRequest request)
    {
        var result = await mediator.Send(request);

        return result.MapToResponse();
    }

    private static async Task<IResult> ApproveRequest(IMediator mediator, [AsParameters] ApproveRequest request)
    {
        var result = await mediator.Send(request);

        return result.MapToResponse();
    }

    private static async Task<IResult> RejectRequest(IMediator mediator, [AsParameters] RejectRequest request)
    {
        var result = await mediator.Send(request);

        return result.MapToResponse();
    }

    private record UpdateCommentRequest(string? Comment);

    private static async Task<IResult> UpdateComment(
        IMediator mediator,
        IValidator<UpdateApprovalRequestComment> validator,
        ClaimsPrincipal user,
        int id,
        UpdateCommentRequest comment)
    {
        var request = new UpdateApprovalRequestComment(user, id, comment.Comment);

        var validationResult = await validator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
            return validationResult.ToResponse();
        }

        var result = await mediator.Send(request);

        return result.MapToResponse();
    }
}
