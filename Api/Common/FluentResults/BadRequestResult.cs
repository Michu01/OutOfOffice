using FluentResults;

namespace Api.Common.FluentResults;

public class BadRequestResult(string message) : Error(message);
