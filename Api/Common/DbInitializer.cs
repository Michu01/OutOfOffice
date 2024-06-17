using Api.ApprovalRequests.Enums;
using Api.ApprovalRequests.Models;
using Api.Common.Extensions;
using Api.Employees.Enums;
using Api.Employees.Models;
using Api.LeaveRequests.Enums;
using Api.LeaveRequests.Models;
using Api.ProjectEmployee;
using Api.Projects.Enums;
using Api.Projects.Models;

using Microsoft.EntityFrameworkCore;

namespace Api.Common;

public static class DbInitializer
{
    private const int HRManagerCount = 10;

    private const int ProjectManagerCount = 10;

    private const int EmployeeCount = 100;

    private const int ProjectCount = 30;

    private const int LeaveRequestCount = 200;

    private static readonly Random random = new(0);

    private static (EmployeeEntity administrator, List<EmployeeEntity> employees, List<EmployeeEntity> projectManagers, List<EmployeeEntity> hrManagers) CreateEmployees()
    {
        static int randomOutOfOfficeBalance() => random.Next(0, 100);

        var employeeId = 1;

        var administrator = new EmployeeEntity
        {
            Id = employeeId,
            Subdivision = "Administrators",
            FullName = "Administrator",
            Position = EmployeePosition.Administrator,
            Status = EmployeeStatus.Active
        };

        ++employeeId;

        var hrManagers = new List<EmployeeEntity>();

        foreach (var i in Enumerable.Range(1, HRManagerCount))
        {
            hrManagers.Add(new EmployeeEntity
            {
                Id = employeeId,
                FullName = $"HR Manager {i}",
                Subdivision = "HR",
                Status = random.NextDouble() < 0.4 ? EmployeeStatus.Active : EmployeeStatus.Inactive,
                OutOfOfficeBalance = randomOutOfOfficeBalance(),
                Position = EmployeePosition.HRManager,
                PeoplePartnerId = null
            });

            ++employeeId;
        }

        var projectManagers = new List<EmployeeEntity>();

        foreach (var i in Enumerable.Range(1, ProjectManagerCount))
        {
            projectManagers.Add(new EmployeeEntity
            {
                Id = employeeId,
                FullName = $"Project Manager {i}",
                Subdivision = "Project Management",
                Status = random.NextDouble() < 0.4 ? EmployeeStatus.Active : EmployeeStatus.Inactive,
                OutOfOfficeBalance = randomOutOfOfficeBalance(),
                Position = EmployeePosition.ProjectManager,
                PeoplePartnerId = hrManagers.RandomElement(random).Id
            });

            ++employeeId;
        }

        var employees = new List<EmployeeEntity>();

        foreach (var i in Enumerable.Range(1, EmployeeCount))
        {
            employees.Add(new EmployeeEntity
            {
                Id = employeeId,
                FullName = $"Employee {i}",
                Subdivision = "Employees",
                Status = random.NextDouble() < 0.4 ? EmployeeStatus.Active : EmployeeStatus.Inactive,
                OutOfOfficeBalance = randomOutOfOfficeBalance(),
                Position = EmployeePosition.Employee,
                PeoplePartnerId = hrManagers.RandomElement(random).Id
            });

            ++employeeId;
        }

        return (administrator, employees, projectManagers, hrManagers);
    }

    private static List<ProjectEntity> CreateProjects(IList<EmployeeEntity> projectManagers)
    {
        var minDate = new DateTime(2020, 1, 1);
        var maxDate = new DateTime(2024, 1, 1);

        var projectTypes = Enumerable.Range(1, 10).Select(e => $"Type {e}").ToList();

        var projects = new List<ProjectEntity>();

        foreach (var i in Enumerable.Range(1, ProjectCount))
        {
            var startDate = DateTimeExtensions.RandomDate(minDate, maxDate, random);
            var endDate = random.NextDouble() < 0.2 ? default(DateTime?) : DateTimeExtensions.RandomDate(startDate, startDate.AddYears(1), random);

            projects.Add(new ProjectEntity
            {
                Id = i,
                Name = $"Project {i}",
                Type = projectTypes.RandomElement(random),
                StartDate = DateOnly.FromDateTime(startDate),
                EndDate = endDate is null ? null : DateOnly.FromDateTime(endDate.Value),
                Status = random.NextDouble() < 0.4 ? ProjectStatus.Active : ProjectStatus.Inactive,
                ProjectManagerId = projectManagers.RandomElement(random).Id,
                Comment = random.NextDouble() < 0.5 ? null : "Comment"
            });
        }

        return projects;
    }

    private static List<ProjectEmployeeEntity> CreateProjectsEmployees(IList<ProjectEntity> projects, IList<EmployeeEntity> employees)
    {
        var projectEmployee = new List<ProjectEmployeeEntity>();

        foreach (var project in projects)
        {
            var projectEmployees = employees.UniqueRandomElements(random, random.Next(1, 10));

            foreach (var employee in projectEmployees)
            {
                projectEmployee.Add(new ProjectEmployeeEntity
                {
                    ProjectId = project.Id,
                    EmployeeId = employee.Id
                });
            }
        }

        return projectEmployee;
    }

    private static List<LeaveRequestEntity> CreateLeaveRequests(IList<EmployeeEntity> employees)
    {
        var minDate = new DateTime(2020, 1, 1);
        var maxDate = new DateTime(2024, 1, 1);

        var absenceReasons = Enumerable.Range(1, 10).Select(e => $"Absence reason {e}").ToList();

        var leaveRequests = new List<LeaveRequestEntity>();

        foreach (var i in Enumerable.Range(1, LeaveRequestCount))
        {
            var employee = employees.RandomElement(random);

            var startDate = DateTimeExtensions.RandomDate(minDate, maxDate, random);
            var endDate = DateTimeExtensions.RandomDate(startDate, startDate.AddDays(30), random);

            var leaveRequest = new LeaveRequestEntity
            {
                Id = i,
                AbsenceReason = absenceReasons.RandomElement(random),
                EmployeeId = employee.Id,
                StartDate = DateOnly.FromDateTime(startDate),
                EndDate = DateOnly.FromDateTime(endDate),
                Status = random.NextDouble() < 0.2 ? LeaveRequestStatus.Canceled : LeaveRequestStatus.Submitted,
                Comment = random.NextDouble() < 0.5 ? null : "Comment"
            };

            leaveRequests.Add(leaveRequest);
        }

        return leaveRequests;
    }

    private static IEnumerable<int> GetEmployeeProjectManagerIds(int employeeId, IList<ProjectEmployeeEntity> projectsEmployees, IList<ProjectEntity> projects)
    {
        return projectsEmployees
            .Where(e => e.EmployeeId == employeeId)
            .Join(projects, e => e.ProjectId, e => e.Id, (_, e) => e.ProjectManagerId);
    }

    private static int GetEmployeePeoplePartnerId(int employeeId, IList<EmployeeEntity> employees)
    {
        return employees.Single(e => e.Id == employeeId).PeoplePartnerId!.Value;
    }

    private static List<ApprovalRequestEntity> CreateApprovalRequests(
        IList<LeaveRequestEntity> leaveRequests,
        IList<ProjectEmployeeEntity> projectsEmployees,
        IList<ProjectEntity> projects,
        IList<EmployeeEntity> employees)
    {
        var assignableStatuses = new[] { ApprovalRequestStatus.Canceled, ApprovalRequestStatus.Rejected, ApprovalRequestStatus.New };

        var approvalRequests = new List<ApprovalRequestEntity>();

        var id = 1;

        foreach (var leaveRequest in leaveRequests)
        {
            var approverIds = 
                GetEmployeeProjectManagerIds(leaveRequest.EmployeeId, projectsEmployees, projects)
                .Append(GetEmployeePeoplePartnerId(leaveRequest.EmployeeId, employees));

            var leaveRequestApprovalRequests = new List<ApprovalRequestEntity>();

            foreach (var approverId in approverIds)
            {
                var approvalRequest = new ApprovalRequestEntity
                {
                    Id = id,
                    ApproverId = approverId,
                    LeaveRequestId = leaveRequest.Id,
                    Comment = random.NextDouble() < 0.5 ? null : "Comment",
                    Status = leaveRequest.Status == LeaveRequestStatus.Canceled ? ApprovalRequestStatus.Canceled : assignableStatuses.RandomElement(random)
                };

                leaveRequestApprovalRequests.Add(approvalRequest);

                ++id;
            }

            if (leaveRequestApprovalRequests.All(e => e.Status == ApprovalRequestStatus.Approved))
            {
                leaveRequest.Status = LeaveRequestStatus.Approved;
            }
            else if (leaveRequestApprovalRequests.Any(e => e.Status == ApprovalRequestStatus.Rejected))
            {
                leaveRequest.Status = LeaveRequestStatus.Rejected;
            }

            approvalRequests.AddRange(leaveRequestApprovalRequests);
        }

        return approvalRequests;
    }

    public static void Seed(ModelBuilder modelBuilder)
    {
        var (administrator, employees, projectManagers, hrManagers) = CreateEmployees();
        var projects = CreateProjects(projectManagers);
        var projectsEmployees = CreateProjectsEmployees(projects, employees);
        var leaveRequests = CreateLeaveRequests(employees);
        var approvalRequests = CreateApprovalRequests(leaveRequests, projectsEmployees, projects, employees);

        modelBuilder.Entity<EmployeeEntity>().HasData(administrator);
        modelBuilder.Entity<EmployeeEntity>().HasData(employees);
        modelBuilder.Entity<EmployeeEntity>().HasData(projectManagers);
        modelBuilder.Entity<EmployeeEntity>().HasData(hrManagers);

        modelBuilder.Entity<ProjectEntity>().HasData(projects);

        modelBuilder.Entity<ProjectEmployeeEntity>().HasData(projectsEmployees);

        modelBuilder.Entity<LeaveRequestEntity>().HasData(leaveRequests);

        modelBuilder.Entity<ApprovalRequestEntity>().HasData(approvalRequests);
    }
}
