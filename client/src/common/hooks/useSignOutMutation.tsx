import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";
import { useNavigate } from "react-router-dom";

function useSignOutMutation() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  async function signOut() {
    return await apiClient.post("identity/signOut");
  }

  return useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["isSignedIn"] });
      navigate("/");
    }
  });
}

export default useSignOutMutation;