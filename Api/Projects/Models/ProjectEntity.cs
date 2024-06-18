using System.ComponentModel.DataAnnotations;
using Api.Employees.Models;
using Api.ProjectEmployee;
using Api.Projects.Enums;

namespace Api.Projects.Models;

public class ProjectEntity
{
    public int Id { get; init; }

    [MaxLength(Constants.MaxNameLength)]
    public required string Name { get; set; }

    [MaxLength(Constants.MaxTypeLength)]
    public required string Type { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public int ProjectManagerId { get; set; }

    public virtual EmployeeEntity? ProjectManager { get; set; }

    [MaxLength(Constants.MaxCommentLength)]
    public string? Comment { get; set; }

    public required ProjectStatus Status { get; set; }

    public virtual ICollection<EmployeeEntity> Employees { get; set; } = [];

    public virtual ICollection<ProjectEmployeeEntity> ProjectsEmployees { get; set; } = [];
}
