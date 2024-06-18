function canManageProjects(employee: Employee | undefined) {
  return employee != undefined && (employee.position == "Administrator" || employee.position == "ProjectManager");
}

export { 
  canManageProjects
}