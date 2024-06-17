import { UseQueryResult, keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";
import PaginatedResult from "../../models/PaginatedResult";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import "../../utility/string";

function useProjectsQuery(pagination: PaginationState, columnFilters: ColumnFiltersState, sorting: SortingState): UseQueryResult<PaginatedResult<Project>> {
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

    const response = await apiClient.get<PaginatedResult<Project>>("projects", {
      params 
    });

    return response.data;
  }

  return useQuery({
    queryFn,
    queryKey: ["projects", pagination, columnFilters, sorting],
    placeholderData: keepPreviousData
  });
}

export default useProjectsQuery;