import { useQuery } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";
import Employee from "src/employees/models/Employee";

function useMeQuery() {
  const queryFn = async () => {
    const response = await apiClient.get<Employee>("identity/me");
    return response.data;
  }

  return useQuery({
    queryKey: ["me"],
    queryFn
  });
}

export default useMeQuery;