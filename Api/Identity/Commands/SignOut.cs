using MediatR;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Api.Identity.Commands;

public record SignOut(HttpContext HttpContext) : IRequest;

public class SignOutHandler : IRequestHandler<SignOut>
{
    public async Task Handle(SignOut request, CancellationToken cancellationToken)
    {
        await request.HttpContext.SignOutAsync();
    }
}
