using AutoMapper;

namespace Api.Common;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<DateOnly, DateTime>().ConvertUsing(e => e.ToDateTime(TimeOnly.MinValue));
        CreateMap<DateTime, DateOnly>().ConvertUsing(e => DateOnly.FromDateTime(e));
    }
}
