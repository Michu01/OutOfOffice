import Employee from "src/employees/models/Employee";

function canManageProjects(employee: Employee | undefined) {
  return employee != undefined && (employee.position == "Administrator" || employee.position == "ProjectManager");
}

function canManageEmployees(employee: Employee | undefined) {
  return employee != undefined && (employee.position == "Administrator" || employee.position == "HRManager");
}

function canMakeLeaveRequests(employee: Employee | undefined) {
  return employee != undefined && (employee.position == "Administrator" || employee.position == "Employee");
}

function canViewEmployees(employee: Employee | undefined) {
  return employee != undefined && employee.position != "Employee";
}

function canManageApprovalRequests(employee: Employee | undefined) {
  return employee != undefined && employee.position != "Employee";
}

function canViewApprovalRequests(employee: Employee | undefined) {
  return employee != undefined && employee.position != "Employee";
}

export { 
  canManageProjects,
  canManageEmployees,
  canMakeLeaveRequests,
  canViewEmployees,
  canManageApprovalRequests,
  canViewApprovalRequests
}