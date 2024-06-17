import { ColumnFiltersState, PaginationState, SortingState, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import TablePageSizeSelect from "./TablePageSizeSelect";
import { Dispatch, SetStateAction, useMemo } from "react";
import Paginator from "./Paginator";

type Props = {
  data: any[] | undefined;
  rowCount: number | undefined;
  columns: any[];
  pagination: PaginationState;
  columnFilters: ColumnFiltersState;
  sorting: SortingState;
  isFetching: boolean;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

function Table(props: Props) {
  const { pagination, columnFilters, sorting, rowCount, isFetching, setSorting, setColumnFilters, setPagination } = props;

  const data = useMemo(() => props.data ?? [], [props.data]);
  const columns = useMemo(() => props.columns, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnFilters,
      sorting
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    rowCount,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 position-relative rounded overflow-hidden bg-white overflow-x-auto mb-3">
        <table className="table mb-0">
          <TableHead headerGroups={table.getHeaderGroups()} />
          <TableBody rowModel={table.getRowModel()} />
        </table>
        {
          isFetching &&
          <div className="position-absolute top-0 w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary border-5" style={{ width: "5rem", height: "5rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      </div>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="text-white">
          Showing {table.getRowModel().rows.length.toLocaleString()} of {rowCount?.toLocaleString()} rows
        </div>
        <Paginator
          page={pagination.pageIndex}
          pageSize={pagination.pageSize}
          rowCount={rowCount}
          setPage={e => setPagination({ ...pagination, pageIndex: e })}
        />
        <TablePageSizeSelect pageSize={pagination.pageSize} setPageSize={e => setPagination({ pageIndex: 0, pageSize: e })} />
      </div>
    </div>
  );
}

export default Table;