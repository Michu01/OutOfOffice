import Employee from "src/employees/models/Employee";

type Project = {
  id: number;
  name: string;
  type: string;
  startDate: string;
  endDate?: string;
  comment?: string;
  status: string;
  projectManager: Employee;
  employees: Employee[];
}

export default Project;