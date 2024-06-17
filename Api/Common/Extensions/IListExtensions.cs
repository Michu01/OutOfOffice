namespace Api.Common.Extensions;

public static class IListExtensions
{
    public static T RandomElement<T>(this IList<T> list, Random random)
    {
        var index = random.Next(list.Count);
        return list[index];
    }

    public static IList<T> UniqueRandomElements<T>(this IList<T> list, Random random, int count)
    {
        var used = new HashSet<int>();
        
        while (used.Count < count)
        {
            used.Add(random.Next(list.Count));
        }

        return used.Select(e => list[e]).ToList();
    }
}
