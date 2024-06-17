import { ColumnFiltersState, PaginationState, SortingState, createColumnHelper } from "@tanstack/react-table";
import useEmployeesQuery from "./useEmployeesQuery";
import { useState } from "react";
import Table from "../../components/Table";

const columnHelper = createColumnHelper<Employee>();

const columns = [
  columnHelper.accessor('id', {
    header: "Id",
    meta: {
      filterVariant: "input",
      filterInputType: "number"
    },
    maxSize: 100
  }),
  columnHelper.accessor('fullName', {
    header: "Full name",
    meta: {
      filterVariant: "input",
      filterInputType: "text"
    }
  }),
  columnHelper.accessor('subdivision', {
    header: "Subdivision",
    enableSorting: false,
    meta: {
      filterVariant: "input",
      filterInputType: "text"
    }
  }),
  columnHelper.accessor('position', {
    header: "Position",
    enableSorting: false,
    meta: {
      filterVariant: "select",
      filterSelectOptions: [
        { key: '', value: 'All' },
        { key: 'Administrator', value: 'Administrator' },
        { key: 'HRManager', value: 'HR Manager' },
        { key: 'ProjectManager', value: 'Project Manager' },
        { key: 'Employee', value: 'Employee' }
      ]
    }
  }),
  columnHelper.accessor('status', {
    header: "Status",
    enableSorting: false,
    meta: {
      filterVariant: "select",
      filterSelectOptions: [
        { key: '', value: 'All' },
        { key: 'Active', value: 'Active' },
        { key: 'Inactive', value: 'Inactive' }
      ]
    }
  }),
  columnHelper.accessor('outOfOfficeBalance', {
    header: "Balance",
    enableColumnFilter: false
  }),
  columnHelper.accessor('peoplePartner.fullName', {
    header: "People partner",
    enableSorting: false,
    enableColumnFilter: false
  })
];

function EmployeesIndex() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isFetching } = useEmployeesQuery(pagination, columnFilters, sorting);

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

export default EmployeesIndex;