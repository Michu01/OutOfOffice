import { UseQueryResult } from "@tanstack/react-query";
import { ColumnFiltersState, ColumnSort, PaginationState, SortingState, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import Paginator from "src/common/components/Paginator";
import Spinner from "src/common/components/Spinner";
import TableBody from "src/common/components/TableBody";
import TableHead from "src/common/components/TableHead";
import TablePageSizeSelect from "src/common/components/TablePageSizeSelect";
import PaginatedResult from "src/common/models/PaginatedResult";
import useLocalStorageState from "use-local-storage-state";

type Props = {
  columns: any[];
  initialColumnSort: ColumnSort;
  useDataQuery: (pagination: PaginationState, columnFilters: ColumnFiltersState, sorting: SortingState) => UseQueryResult<PaginatedResult<any>>
}

function Table(props: Props) {
  const { initialColumnSort, useDataQuery } = props;

  const [pageSize, setPageSize] = useLocalStorageState("pageSize", { defaultValue: 20 });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([initialColumnSort]);

  const { data: paginatedResult, isFetching } = useDataQuery(pagination, columnFilters, sorting);

  const data = useMemo(() => paginatedResult?.items ?? [], [paginatedResult]);
  const columns = useMemo(() => props.columns, [props.columns]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnFilters,
      sorting
    },
    enableSortingRemoval: false,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    enableMultiSort: false,
    rowCount: paginatedResult?.totalCount,
    onSortingChange: setSorting,
    onColumnFiltersChange: e => {
      setPagination({ ...pagination, pageIndex: 0 });
      setColumnFilters(e);
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel()
  });

  useEffect(() => {
    setPageSize(pagination.pageSize);
  }, [pagination]);

  return (
    <>
      <div className="d-flex flex-grow-1 rounded position-relative bg-white mb-3 p-1">
        <div className="table-responsive flex-grow-1">
          <table className="table mb-0">
            <TableHead headerGroups={table.getHeaderGroups()} />
            <TableBody rowModel={table.getRowModel()} />
          </table>
          { isFetching && <Spinner /> }
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div className="text-white">
          {paginatedResult != undefined && <>Showing {table.getRowModel().rows.length.toLocaleString()} of {paginatedResult.totalCount.toLocaleString()} rows</>}
        </div>
        <Paginator
          page={pagination.pageIndex}
          pageSize={pagination.pageSize}
          rowCount={paginatedResult?.totalCount}
          setPage={e => setPagination({ ...pagination, pageIndex: e })}
        />
        <TablePageSizeSelect pageSize={pagination.pageSize} setPageSize={e => setPagination({ pageIndex: 0, pageSize: e })} />
      </div>
      <div className="d-block d-xxl-none" style={{ height: 64 }} />
    </>
  );
}

export default Table;