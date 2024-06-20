import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";
import EmployeeFormInputs from "src/employees/models/EmployeeFormInputs";
import Employee from "src/employees/models/Employee";

function useUpdateEmployeeMutation() {
  const queryClient = useQueryClient();

  const mutationFn = async (data: EmployeeFormInputs) => {
    const response = await apiClient.put<Employee>(`employees/${data.id}`, data);
    return response.data;
  }
  
  return useMutation({
    mutationFn,
    onSuccess: async () => { 
      await queryClient.invalidateQueries({ queryKey: ["employees"] });
    }
  });
}

export default useUpdateEmployeeMutation;