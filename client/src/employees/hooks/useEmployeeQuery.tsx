import { useQuery } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";
import Employee from "src/employees/models/Employee";

function useEmployeeQuery(id: number | undefined) {
  const queryFn = async () => {
    const response = await apiClient.get<Employee>(`employees/${id}`);
    return response.data;
  }
  
  return useQuery({
    queryFn,
    queryKey: ["employees", id],
    enabled: id != undefined
  });
}

export default useEmployeeQuery;