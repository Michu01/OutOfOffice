using Api.Employees.Models;
using Api.Projects.Enums;

namespace Api.Projects.Models;

public record ProjectDetails
{
    public int Id { get; init; }

    public required string Name { get; init; }

    public required string Type { get; init; }

    public DateOnly StartDate { get; init; }

    public DateOnly? EndDate { get; init; }

    public required EmployeeBrief ProjectManager { get; init; }

    public string? Comment { get; init; }

    public ProjectStatus Status { get; init; }

    public required IReadOnlyCollection<EmployeeBrief> Employees { get; init; }
}
