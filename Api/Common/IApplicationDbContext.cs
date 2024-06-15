using Api.ApprovalRequests.Models;
using Api.Employees.Models;
using Api.LeaveRequests.Models;
using Api.Projects.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Common;

public interface IApplicationDbContext
{
    DbSet<ApprovalRequestEntity> ApprovalRequests { get; }

    DbSet<EmployeeEntity> Employees { get; }

    DbSet<LeaveRequestEntity> LeaveRequests { get; }

    DbSet<ProjectEntity> Projects { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
