import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";

function useApprovalRequestUpdateCommentMutation() {
  const queryClient = useQueryClient();

  const mutationFn = async ({ id, comment }: { id: number, comment?: string }) => {
    await apiClient.put(`approvalRequests/${id}/updateComment`, {
      comment
    });
  }

  return useMutation({
    mutationFn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["approvalRequests", variables.id] });
    }
  });
}

export default useApprovalRequestUpdateCommentMutation;