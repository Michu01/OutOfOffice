import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../services/apiClient";
import ProjectFormInputs from "../models/ProjectFormInputs";

function useUpdateProjectMutation() {
  const queryClient = useQueryClient();

  const mutationFn = async (data: ProjectFormInputs) => {
    const response = await apiClient.put<Project>(`projects/${data.id}`, data);
    return response.data;
  }
  
  return useMutation({
    mutationFn,
    onSuccess: async () => { 
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      await queryClient.invalidateQueries({ queryKey: ["employees"] });
    }
  });
}

export default useUpdateProjectMutation;