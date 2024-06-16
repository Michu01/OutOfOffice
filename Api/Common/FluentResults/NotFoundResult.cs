using FluentResults;

namespace Api.Common.FluentResults;

public class NotFoundResult(string entityName) : Error($"{entityName} not found");
