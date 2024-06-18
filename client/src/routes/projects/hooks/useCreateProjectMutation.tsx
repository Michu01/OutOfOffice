import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../services/apiClient";
import ProjectFormInputs from "../models/ProjectFormInputs";

function useCreateProjectMutation() {
  const queryClient = useQueryClient();

  const mutationFn = async (data: ProjectFormInputs) => {
    const response = await apiClient.post<Project>("projects", data);
    return response.data;
  }
  
  return useMutation({
    mutationFn,
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    }
  });
}

export default useCreateProjectMutation;