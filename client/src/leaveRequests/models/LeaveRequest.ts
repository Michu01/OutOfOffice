import ApprovalRequest from "src/approvalRequests/models/ApprovalRequest";
import Employee from "src/employees/models/Employee";

type LeaveRequest = {
  id: number;
  startDate: string;
  endDate: string;
  absenceReason: string;
  status: string;
  comment?: string;
  employee: Employee;
  approvalRequests: ApprovalRequest[];
}

export default LeaveRequest;