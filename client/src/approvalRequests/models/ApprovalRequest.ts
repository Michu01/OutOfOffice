import Employee from "src/employees/models/Employee";
import LeaveRequest from "src/leaveRequests/models/LeaveRequest";

type ApprovalRequest = {
  id: number;
  status: string;
  comment: string;
  approver: Employee;
  leaveRequest: LeaveRequest;
}

export default ApprovalRequest;