function canManageProjects(employee: Employee | undefined) {
  return employee != undefined && (employee.position == "Administrator" || employee.position == "ProjectManager");
}

function canManageEmployees(employee: Employee | undefined) {
  return employee != undefined && (employee.position == "Administrator" || employee.position == "HRManager");
}

export { 
  canManageProjects,
  canManageEmployees
}