import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";
import EmployeeFormInputs from "src/employees/models/EmployeeFormInputs";

function useAddEmployeeMutation() {
  const queryClient = useQueryClient();

  const mutationFn = async (data: EmployeeFormInputs) => {
    const response = await apiClient.post<Employee>("employees", data);
    return response.data;
  }
  
  return useMutation({
    mutationFn,
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    }
  });
}

export default useAddEmployeeMutation;