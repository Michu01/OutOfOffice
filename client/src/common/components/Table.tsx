import { ColumnFiltersState, PaginationState, SortingState, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo } from "react";
import Paginator from "src/common/components/Paginator";
import Spinner from "src/common/components/Spinner";
import TableBody from "src/common/components/TableBody";
import TableHead from "src/common/components/TableHead";
import TablePageSizeSelect from "src/common/components/TablePageSizeSelect";

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
  const columns = useMemo(() => props.columns, [props.columns]);

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
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="text-white">
          {rowCount != undefined && <>Showing {table.getRowModel().rows.length.toLocaleString()} of {rowCount.toLocaleString()} rows</>}
        </div>
        <Paginator
          page={pagination.pageIndex}
          pageSize={pagination.pageSize}
          rowCount={rowCount}
          setPage={e => setPagination({ ...pagination, pageIndex: e })}
        />
        <TablePageSizeSelect pageSize={pagination.pageSize} setPageSize={e => setPagination({ pageIndex: 0, pageSize: e })} />
      </div>
    </>
  );
}

export default Table;