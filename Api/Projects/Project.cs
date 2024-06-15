using System.ComponentModel.DataAnnotations;

using Api.Employees;

namespace Api.Projects;

public class Project
{
    public int Id { get; init; }

    [MaxLength(Constants.MaxNameLength)]
    public required string Name { get; set; }

    [MaxLength(Constants.MaxTypeLength)]
    public required string Type { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public int ProjectManagerId { get; set; }

    public virtual Employee? ProjectManager { get; set; }

    [MaxLength(Constants.MaxCommentLength)]
    public string? Comment { get; set; }

    public required ProjectStatus Status { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = [];
}
