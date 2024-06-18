import { useMutation } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";
import { useNavigate } from "react-router-dom";

function useSignOutMutation() {
  const navigate = useNavigate();

  async function signOut() {
    return await apiClient.post("identity/signOut");
  }

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => navigate(0)
  });
}

export default useSignOutMutation;