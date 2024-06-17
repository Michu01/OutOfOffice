using Api.Employees.Models;
using Api.Projects.Models;

using Microsoft.EntityFrameworkCore;

namespace Api.ProjectEmployee;

[PrimaryKey(nameof(ProjectId), nameof(EmployeeId))]
public class ProjectEmployeeEntity
{
    public int ProjectId { get; init; }

    public virtual ProjectEntity? Project { get; init; }

    public int EmployeeId { get; init; }

    public virtual EmployeeEntity? Employee { get; init; }
}
