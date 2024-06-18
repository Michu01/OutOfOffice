using Api.Projects.Enums;

namespace Api.Projects.Models;

public record CreateProject(
    string Name,
    string Type,
    DateTime StartDate,
    DateTime? EndDate,
    string? Comment,
    ProjectStatus Status,
    int[] EmployeeIds);
