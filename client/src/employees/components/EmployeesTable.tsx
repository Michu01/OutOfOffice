import { createColumnHelper, PaginationState, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Table from "src/common/components/Table";
import AvatarSize from "src/common/constants/AvatarSize";
import EmployeeBriefComponent from "src/employees/components/EmployeeBriefComponent";
import useEmployeesQuery from "src/employees/hooks/useEmployeesQuery";
import EmployeeAvatar from "./EmployeeAvatar";

const columnHelper = createColumnHelper<Employee>();

const columns = [
  columnHelper.display({
    id: "avatar",
    size: 0,
    cell: context => <EmployeeAvatar employeeId={context.row.original.id} size={AvatarSize.Small} />
  }),
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
  }),
  columnHelper.display({
    header: "Details",
    size: 0,
    cell: context =>
      <Link className="btn btn-warning" to={context.row.original.id.toString()}>
        <FaEdit />
      </Link>
  })
];

function EmployeesTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isFetching } = useEmployeesQuery(pagination, columnFilters, sorting);

  return (
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
  );
}

export default EmployeesTable;