import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../services/apiClient";

function useProjectQuery(id: number | undefined) {
  const queryFn = async () => {
    const response = await apiClient.get<Project>(`projects/${id}`);
    return response.data;
  }
  
  return useQuery({
    queryFn,
    queryKey: ["projects", id],
    enabled: id != undefined
  });
}

export default useProjectQuery;