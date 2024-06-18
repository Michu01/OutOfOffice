import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";

function useSignInMutation() {
  const queryClient = useQueryClient();

  const mutationFn = async (data: { fullName: string }) => {
    const response = await apiClient.post("identity/signIn", data);
    return response.data;
  }

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    }
  });
}

export default useSignInMutation;