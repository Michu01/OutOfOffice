type LeaveRequest = {
  id: number;
  startDate: string;
  endDate: string;
  absenceReason: string;
  status: string;
  comment?: string;
  employee: Employee;
}