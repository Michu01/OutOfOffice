import { UseQueryResult, keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "src/common/services/apiClient";
import PaginatedResult from "src/common/models/PaginatedResult";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import "src/common/utility/string";
import Employee from "src/employees/models/Employee";

function useEmployeesQuery(pagination: PaginationState, columnFilters: ColumnFiltersState, sorting: SortingState): UseQueryResult<PaginatedResult<Employee>> {
  const getSort = (sorting: SortingState) => {
    const first = sorting[0];
    if (!first) {
      return "FullNameAsc";
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

    const response = await apiClient.get<PaginatedResult<Employee>>("employees", {
      params 
    });

    return response.data;
  }

  return useQuery({
    queryFn,
    queryKey: ["employees", pagination, columnFilters, sorting],
    placeholderData: keepPreviousData
  });
}

export default useEmployeesQuery;