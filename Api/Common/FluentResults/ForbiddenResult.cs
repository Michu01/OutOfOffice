using FluentResults;

namespace Api.Common.FluentResults;

public class ForbiddenResult(string entityName, int id) : Error($"Access forbidden to {entityName} with id {id}");
