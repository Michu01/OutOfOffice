import { createColumnHelper } from "@tanstack/react-table";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import AvatarSize from "src/common/constants/AvatarSize";
import EmployeeBriefComponent from "src/employees/components/EmployeeBriefComponent";
import ApprovalRequestStatusBadge from "src/approvalRequests/components/ApprovalRequestStatusBadge";
import ApprovalRequest from "src/approvalRequests/models/ApprovalRequest";

const columnHelper = createColumnHelper<ApprovalRequest>();

function createApprovalRequestsTableColumns(showApprover: boolean) {
  return [
    columnHelper.accessor('id', {
      header: "Id",
      meta: {
        filterVariant: "input",
        filterInputType: "number"
      },
      maxSize: 100
    }),
    columnHelper.accessor('leaveRequest.absenceReason', {
      id: "absenceReason",
      header: "Absence reason",
      meta: {
        filterVariant: "input",
        filterInputType: "text"
      },
      enableSorting: false
    }),
    columnHelper.accessor('leaveRequest.startDate', {
      id: "startDate",
      header: "Start date",
      enableColumnFilter: false
    }),
    columnHelper.accessor('leaveRequest.endDate', {
      id: "endDate",
      header: "End date",
      enableColumnFilter: false
    }),
    columnHelper.accessor('status', {
      header: "Status",
      meta: {
        filterVariant: 'select',
        filterSelectOptions: [
          { key: '', value: 'All' },
          { key: 'New', value: 'New' },
          { key: 'Canceled', value: 'Canceled' },
          { key: 'Approved', value: 'Approved' },
          { key: 'Rejected', value: 'Rejected' }
        ]
      },
      enableSorting: false,
      cell: context => <ApprovalRequestStatusBadge status={context.getValue()} />
    }),
    columnHelper.accessor('leaveRequest.employee', {
      header: "Employee",
      enableColumnFilter: false,
      enableSorting: false,
      cell: context => <EmployeeBriefComponent avatarSize={AvatarSize.Small} employee={context.getValue()} />
    }),
    ... showApprover ? [
      columnHelper.accessor('approver', {
        header: "Approver",
        enableColumnFilter: false,
        enableSorting: false,
        cell: context => <EmployeeBriefComponent avatarSize={AvatarSize.Small} employee={context.getValue()} />
      })] : [],
    columnHelper.display({
      header: "Details",
      size: 0,
      cell: context =>
        <Link className="btn btn-warning" to={context.row.original.id.toString()}>
          <FaEdit />
        </Link>
    })
  ];
}

export default createApprovalRequestsTableColumns;