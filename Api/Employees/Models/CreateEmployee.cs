using Api.Employees.Enums;

namespace Api.Employees.Models;

public record CreateEmployee(
    string FullName,
    string Subdivision,
    EmployeeStatus Status,
    int OutOfOfficeBalance);
