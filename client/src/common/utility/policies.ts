function canManageProjects(employee: Employee | undefined) {
  return employee != undefined && (employee.position == "Administrator" || employee.position == "ProjectManager");
}

function canManageEmployees(employee: Employee | undefined) {
  return employee != undefined && (employee.position == "Administrator" || employee.position == "HRManager");
}

function canMakeLeaveRequests(employee: Employee | undefined) {
  return employee != undefined && (employee.position == "Administrator" || employee.position == "Employee");
}

export { 
  canManageProjects,
  canManageEmployees,
  canMakeLeaveRequests
}