import { UseQueryResult, keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import "src/common/utility/string";
import PaginatedResult from "src/common/models/PaginatedResult";
import apiClient from "src/common/services/apiClient";
import LeaveRequest from "src/leaveRequests/models/LeaveRequest";

function useLeaveRequestsQuery(pagination: PaginationState, columnFilters: ColumnFiltersState, sorting: SortingState): UseQueryResult<PaginatedResult<LeaveRequest>> {
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

    const response = await apiClient.get<PaginatedResult<LeaveRequest>>("leaveRequests", {
      params 
    });

    return response.data;
  }

  return useQuery({
    queryFn,
    queryKey: ["leaveRequests", pagination, columnFilters, sorting],
    placeholderData: keepPreviousData
  });
}

export default useLeaveRequestsQuery;