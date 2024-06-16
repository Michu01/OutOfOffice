﻿using Api.ApprovalRequests.Commands;
using Api.ApprovalRequests.Queries;
using Api.Common.Extensions;
using Api.Identity;
using Api.LeaveRequests.Commands;
using Api.LeaveRequests.Queries;

using MediatR;

namespace Api.LeaveRequests;

public static class Endpoints
{
    public static void MapLeaveRequestEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder
            .MapGroup("leaveRequests")
            .WithTags("LeaveRequests");

        group
            .MapGet(string.Empty, GetLeaveRequests)
            .RequireAuthorization(nameof(Policy.ViewLeaveRequests));

        group
            .MapGet("{id}", GetLeaveRequest)
            .RequireAuthorization(nameof(Policy.ViewLeaveRequests));

        group
            .MapPost(string.Empty, SubmitLeaveRequest)
            .RequireAuthorization(nameof(Policy.ManageLeaveRequests));

        group
            .MapPut("{id}/cancel", CancelLeaveRequest)
            .RequireAuthorization(nameof(Policy.ManageLeaveRequests));
    }

    private static async Task<IResult> GetLeaveRequests(IMediator mediator, [AsParameters] GetLeaveRequests request)
    {
        var result = await mediator.Send(request);

        return Results.Ok(result);
    }

    private static async Task<IResult> GetLeaveRequest(IMediator mediator, [AsParameters] GetLeaveRequest request)
    {
        var result = await mediator.Send(request);

        return result.MapToResponse();
    }

    private static async Task<IResult> SubmitLeaveRequest(IMediator mediator, [AsParameters] SubmitLeaveRequest request)
    {
        var result = await mediator.Send(request);

        return result.MapToResponse();
    }

    private static async Task<IResult> CancelLeaveRequest(IMediator mediator, [AsParameters] CancelLeaveRequest request)
    {
        var result = await mediator.Send(request);

        return result.MapToResponse();
    }
}
