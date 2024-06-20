import { useQuery } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";
import ApprovalRequest from "src/approvalRequests/models/ApprovalRequest";

function useApprovalRequestQuery(id: number | undefined) {
  const queryFn = async () => {
    const response = await apiClient.get<ApprovalRequest>(`approvalRequests/${id}`);
    return response.data;
  }
  
  return useQuery({
    queryFn,
    queryKey: ["approvalRequests", id],
    enabled: id != undefined
  });
}

export default useApprovalRequestQuery;