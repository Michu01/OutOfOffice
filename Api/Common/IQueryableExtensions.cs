using Microsoft.EntityFrameworkCore;

namespace Api.Common;

public static class IQueryableExtensions
{
    public static async Task<PaginatedResult<T>> ToPaginatedResult<T>(this IQueryable<T> query, int page, int limit, CancellationToken cancellationToken)
    {
        var count = await query.CountAsync(cancellationToken);
        var items = await query
            .Skip((page - 1) * limit)
            .Take(limit)
            .ToArrayAsync(cancellationToken);

        return new(items, count);
    }
}
