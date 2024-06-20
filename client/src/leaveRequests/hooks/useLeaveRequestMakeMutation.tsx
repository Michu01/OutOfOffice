import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";
import LeaveRequestFormInputs from "src/leaveRequests/models/LeaveRequestFormInputs";
import LeaveRequest from "src/leaveRequests/models/LeaveRequest";

function useLeaveRequestMakeMutation() {
  const queryClient = useQueryClient();

  const mutationFn = async (data: LeaveRequestFormInputs) => {
    const response = await apiClient.post<LeaveRequest>("leaveRequests", data);
    return response.data;
  }
  
  return useMutation({
    mutationFn,
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
      queryClient.invalidateQueries({ queryKey: ["approvalRequests"] });
    }
  });
}

export default useLeaveRequestMakeMutation;