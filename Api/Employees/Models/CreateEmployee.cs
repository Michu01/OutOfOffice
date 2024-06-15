using Api.Employees.Enums;

namespace Api.Employees.Models;

public record CreateEmployee(
    string FullName,
    string Subdivision,
    EmployeePosition Position,
    EmployeeStatus Status,
    int? PeoplePartnerId,
    int OutOfOfficeBalance);
