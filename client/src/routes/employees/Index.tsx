import { ColumnFiltersState, PaginationState, SortingState, createColumnHelper } from "@tanstack/react-table";
import useEmployeesQuery from "./useEmployeesQuery";
import { useState } from "react";
import Table from "../../components/Table";
import EmployeeBriefComponent from "./EmployeeBriefComponent";
import AvatarSize from "../../constants/AvatarSize";
import Scaffold from "../../components/Scaffold";

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
  columnHelper.accessor('peoplePartner', {
    header: "People partner",
    enableSorting: false,
    enableColumnFilter: false,
    cell: context => {
      const employee = context.getValue();
      return employee ? <EmployeeBriefComponent avatarSize={AvatarSize.Small} employee={employee} /> : "-"
    }
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
    <Scaffold>
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
    </Scaffold>
  );
}

export default EmployeesIndex;