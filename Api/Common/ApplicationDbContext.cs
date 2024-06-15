using Api.ApprovalRequests.Models;
using Api.Employees.Models;
using Api.LeaveRequests.Models;
using Api.Projects.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Common;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options), IApplicationDbContext
{
    public required DbSet<ApprovalRequestEntity> ApprovalRequests { get; init; }

    public required DbSet<EmployeeEntity> Employees { get; init; }

    public required DbSet<LeaveRequestEntity> LeaveRequests { get; init; }

    public required DbSet<ProjectEntity> Projects { get; init; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ApprovalRequestEntity>()
            .HasOne(e => e.Approver)
            .WithMany(e => e.ApprovalRequests)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<LeaveRequestEntity>()
            .HasOne(e => e.Employee)
            .WithMany(e => e.LeaveRequests)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<EmployeeEntity>()
            .HasMany(e => e.Projects)
            .WithMany(e => e.Employees);

        modelBuilder.Entity<EmployeeEntity>()
            .HasMany(e => e.ManagedProjects)
            .WithOne(e => e.ProjectManager)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<EmployeeEntity>()
            .HasMany(e => e.Employees)
            .WithOne(e => e.PeoplePartner)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
