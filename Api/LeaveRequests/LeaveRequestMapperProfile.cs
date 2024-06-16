using Api.ApprovalRequests.Models;
using Api.LeaveRequests.Models;

using AutoMapper;

namespace Api.LeaveRequests;

public class LeaveRequestMapperProfile : Profile
{
    public LeaveRequestMapperProfile()
    {
        CreateMap<CreateLeaveRequest, LeaveRequestEntity>()
            .ForMember(e => e.EmployeeId, e => e
                .MapFrom((_, _, _, context) => context.Items[nameof(LeaveRequestEntity.EmployeeId)]));

        CreateMap<LeaveRequestEntity, LeaveRequest>();
        CreateMap<LeaveRequestEntity, LeaveRequestBrief>();
        CreateMap<LeaveRequestEntity, LeaveRequestDetails>();

        CreateMap<ApprovalRequestEntity, LeaveRequestApprovalRequest>();
    }
}
