namespace Api.Common.Extensions;

public static class DateTimeExtensions
{
    public static DateTime RandomDate(DateTime minDate, DateTime maxDate, Random random)
    {
        var ticks = random.NextInt64(minDate.Ticks, maxDate.Ticks);
        return new DateTime(ticks);
    }
}
