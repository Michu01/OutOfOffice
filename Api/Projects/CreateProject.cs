namespace Api.Projects;

public record CreateProject(
    string Name,
    string Type,
    DateTime StartDate,
    DateTime? EndDate,
    int ProjectManagerId,
    string? Comment);
