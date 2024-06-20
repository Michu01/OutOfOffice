import LeaveRequest from "src/leaveRequests/models/LeaveRequest";

type Employee = {
  id: number;
  fullName: string;
  subdivision: string;
  position: string;
  status: string;
  outOfOfficeBalance: number;
  peoplePartner?: Employee;
  projects: Project[];
  managedProjects: Project[];
  employees: Employee[];
  leaveRequests: LeaveRequest[];
}

export default Employee;