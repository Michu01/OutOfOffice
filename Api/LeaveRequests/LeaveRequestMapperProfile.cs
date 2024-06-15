using Api.LeaveRequests.Models;

using AutoMapper;

namespace Api.LeaveRequests;

public class LeaveRequestMapperProfile : Profile
{
    public LeaveRequestMapperProfile()
    {
        CreateMap<LeaveRequestEntity, LeaveRequest>();
        CreateMap<LeaveRequestEntity, LeaveRequestBrief>();
    }
}
