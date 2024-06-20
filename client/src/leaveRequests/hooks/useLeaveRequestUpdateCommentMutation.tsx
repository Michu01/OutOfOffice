import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";

function useLeaveRequestUpdateCommentMutation() {
  const queryClient = useQueryClient();

  const mutationFn = async ({ id, comment }: { id: number, comment?: string }) => {
    await apiClient.put(`leaveRequests/${id}/updateComment`, {
      comment
    });
  }

  return useMutation({
    mutationFn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["leaveRequests", variables.id] });
    }
  });
}

export default useLeaveRequestUpdateCommentMutation;