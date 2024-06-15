using Api.ApprovalRequests;
using Api.Employees;
using Api.LeaveRequests;
using Api.Projects;

using Microsoft.EntityFrameworkCore;

namespace Api.Common;

public interface IApplicationDbContext
{
    DbSet<ApprovalRequest> ApprovalRequests { get; }

    DbSet<Employee> Employees { get; }

    DbSet<LeaveRequest> LeaveRequests { get; }

    DbSet<Project> Projects { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
