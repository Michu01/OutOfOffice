import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";

function useApprovalRequestApproveMutation() {
  const queryClient = useQueryClient();

  const mutationFn = async ({ id }: { id: number }) => {
    await apiClient.put(`approvalRequests/${id}/approve`);
  }

  return useMutation({
    mutationFn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
      queryClient.invalidateQueries({ queryKey: ["approvalRequests", variables.id] });
    }
  });
}

export default useApprovalRequestApproveMutation;