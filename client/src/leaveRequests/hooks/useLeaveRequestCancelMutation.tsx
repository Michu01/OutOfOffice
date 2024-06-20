import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";

function useLeaveRequestCancelMutation() {
  const queryClient = useQueryClient();

  const mutationFn = async ({ id }: { id: number }) => {
    await apiClient.put(`leaveRequests/${id}/cancel`);
  }

  return useMutation({
    mutationFn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["leaveRequests", variables.id] });
    }
  });
}

export default useLeaveRequestCancelMutation;