namespace Api.Common;

public record PaginatedResult<T>(
    IReadOnlyCollection<T> Items,
    int TotalCount);
