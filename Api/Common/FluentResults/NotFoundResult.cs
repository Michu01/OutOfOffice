using FluentResults;

namespace Api.Common.FluentResults;

public class NotFoundResult : Error
{
    public NotFoundResult(string entityName, int id) : base($"{entityName} with id {id} not found") { }

    public NotFoundResult(string entityName, string propertyName, string propertyValue) : base($"{entityName} with {propertyName} \"{propertyValue}\" not found") { }
}
