import { useQuery } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";
import LeaveRequest from "src/leaveRequests/models/LeaveRequest";

function useLeaveRequestQuery(id: number | undefined) {
  const queryFn = async () => {
    const response = await apiClient.get<LeaveRequest>(`leaveRequests/${id}`);
    return response.data;
  }
  
  return useQuery({
    queryFn,
    queryKey: ["leaveRequests", id],
    enabled: id != undefined
  });
}

export default useLeaveRequestQuery;