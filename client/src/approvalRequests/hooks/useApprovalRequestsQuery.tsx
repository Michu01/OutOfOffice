import { UseQueryResult, keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import "src/common/utility/string";
import PaginatedResult from "src/common/models/PaginatedResult";
import apiClient from "src/common/services/apiClient";
import ApprovalRequest from "src/approvalRequests/models/ApprovalRequest";

function useApprovalRequestsQuery(pagination: PaginationState, columnFilters: ColumnFiltersState, sorting: SortingState): UseQueryResult<PaginatedResult<ApprovalRequest>> {
  const getSort = (sorting: SortingState) => {
    const first = sorting[0];
    if (!first) {
      return "StartDateDesc";
    }

    return first.id.capitalize() + (first.desc ? "Desc" : "Asc");
  }
  
  const queryFn = async () => {
    const filters = columnFilters.reduce((a, v) => ({ ...a, [v.id]: v.value}), {});

    const params = {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      sort: getSort(sorting),
      ...filters
    };

    const response = await apiClient.get<PaginatedResult<ApprovalRequest>>("approvalRequests", {
      params 
    });

    return response.data;
  }

  return useQuery({
    queryFn,
    queryKey: ["approvalRequests", pagination, columnFilters, sorting],
    placeholderData: keepPreviousData
  });
}

export default useApprovalRequestsQuery;