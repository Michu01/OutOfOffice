import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import apiClient from "src/common/services/apiClient";
import Employee from "src/employees/models/Employee";

function useIsSignedInQuery() {
  const queryFn = async () => {
    const response = await apiClient.get<Employee>("identity/isSignedIn", {
      validateStatus: status => status == HttpStatusCode.Ok || status == HttpStatusCode.Unauthorized
    });
    return response.status == HttpStatusCode.Ok;
  }

  return useQuery({
    queryKey: ["isSignedIn"],
    queryFn
  });
}

export default useIsSignedInQuery;