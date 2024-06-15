using System.Drawing;

using Api.ApprovalRequests;
using Api.Employees;
using Api.LeaveRequests;
using Api.Projects;

using Microsoft.EntityFrameworkCore;

namespace Api.Common;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options), IApplicationDbContext
{
    public required DbSet<ApprovalRequest> ApprovalRequests { get; init; }

    public required DbSet<Employee> Employees { get; init; }

    public required DbSet<LeaveRequest> LeaveRequests { get; init; }

    public required DbSet<Project> Projects { get; init; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ApprovalRequest>()
            .HasOne(e => e.Approver)
            .WithMany(e => e.ApprovalRequests)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<LeaveRequest>()
            .HasOne(e => e.Employee)
            .WithMany(e => e.LeaveRequests)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
