using Api.ApprovalRequests.Models;

using AutoMapper;

namespace Api.ApprovalRequests;

public class ApprovalRequestMapperProfile : Profile
{
    public ApprovalRequestMapperProfile()
    {
        CreateMap<ApprovalRequestEntity, ApprovalRequest>();
        CreateMap<ApprovalRequestEntity, ApprovalRequestBrief>();
    }
}
