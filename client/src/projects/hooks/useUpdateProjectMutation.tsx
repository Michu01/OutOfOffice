import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";
import ProjectFormInputs from "src/projects/models/ProjectFormInputs";
import Project from "src/projects/models/Project";

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