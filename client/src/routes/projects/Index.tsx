import { ColumnFiltersState, PaginationState, SortingState, createColumnHelper } from "@tanstack/react-table";
import useProjectsQuery from "./useProjectsQuery";
import { useState } from "react";
import Table from "../../components/Table";

const columnHelper = createColumnHelper<Project>();

const columns = [
  columnHelper.accessor('id', {
    header: "Id",
    meta: {
      filterVariant: "input",
      filterInputType: "number",
      filterInputPlaceholder: ""
    },
    maxSize: 100
  }),
  columnHelper.accessor('name', {
    header: "Name",
    meta: {
      filterVariant: "input",
      filterInputType: "text"
    }
  }),
  columnHelper.accessor('type', {
    header: "Type",
    meta: {
      filterVariant: 'input',
      filterInputType: "text"
    },
    enableSorting: false
  }),
  columnHelper.accessor('startDate', {
    header: "Start date",
    enableColumnFilter: false
  }),
  columnHelper.accessor('endDate', {
    header: "End date",
    enableColumnFilter: false,
    sortDescFirst: true
  }),
  columnHelper.accessor('status', {
    header: "Status",
    meta: {
      filterVariant: 'select',
      filterSelectOptions: [
        { key: '', value: 'All' },
        { key: 'Active', value: 'Active' },
        { key: 'Inactive', value: 'Inactive' }
      ]
    },
    enableSorting: false
  }),
  columnHelper.accessor('projectManager.fullName', {
    header: "Project manager",
    enableColumnFilter: false,
    enableSorting: false
  })
];

function ProjectsIndex() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isFetching } = useProjectsQuery(pagination, columnFilters, sorting);

  return (
    <div className="d-flex container py-3 flex-grow-1">
      <Table
        data={data?.items}
        rowCount={data?.totalCount}
        columns={columns}
        pagination={pagination}
        columnFilters={columnFilters}
        sorting={sorting}
        isFetching={isFetching}
        setPagination={setPagination}
        setColumnFilters={setColumnFilters}
        setSorting={setSorting}
      />
    </div>
  );
}

export default ProjectsIndex;