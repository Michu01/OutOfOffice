import { PaginationState, ColumnFiltersState, SortingState, createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import Table from "src/common/components/Table";
import useLeaveRequestsQuery from "src/leaveRequests/hooks/useLeaveRequestsQuery";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import AvatarSize from "src/common/constants/AvatarSize";
import EmployeeBriefComponent from "src/employees/components/EmployeeBriefComponent";
import LeaveRequestStatusBadge from "src/leaveRequests/components/LeaveRequestStatusBadge";

const columnHelper = createColumnHelper<LeaveRequest>();

const columns = [
  columnHelper.accessor('id', {
    header: "Id",
    meta: {
      filterVariant: "input",
      filterInputType: "number"
    },
    maxSize: 100
  }),
  columnHelper.accessor('absenceReason', {
    header: "Absence reason",
    meta: {
      filterVariant: "input",
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
    enableColumnFilter: false
  }),
  columnHelper.accessor('status', {
    header: "Status",
    meta: {
      filterVariant: 'select',
      filterSelectOptions: [
        { key: '', value: 'All' },
        { key: 'Submitted', value: 'Submitted' },
        { key: 'Canceled', value: 'Canceled' },
        { key: 'Approved', value: 'Approved' },
        { key: 'Rejected', value: 'Rejected' }
      ]
    },
    enableSorting: false,
    cell: context => <LeaveRequestStatusBadge status={context.getValue()} />
  }),
  columnHelper.accessor('employee', {
    header: "Employee",
    enableColumnFilter: false,
    enableSorting: false,
    cell: context => <EmployeeBriefComponent avatarSize={AvatarSize.Small} employee={context.getValue()} />
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

function LeaveRequestsTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isFetching } = useLeaveRequestsQuery(pagination, columnFilters, sorting);

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

export default LeaveRequestsTable;