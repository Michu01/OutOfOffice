namespace Api.Employees;

public record CreateEmployee(
    string FullName,
    string Subdivision,
    EmployeePosition Position,
    EmployeeStatus Status,
    int? PeoplePartnerId,
    int OutOfOfficeBalance);
