import { createColumnHelper } from "@tanstack/react-table";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import AvatarSize from "src/common/constants/AvatarSize";
import formatEnum from "src/common/utility/formatEnum";
import EmployeeAvatar from "src/employees/components/EmployeeAvatar";
import EmployeeBriefComponent from "src/employees/components/EmployeeBriefComponent";
import Employee from "src/employees/models/Employee";

const columnHelper = createColumnHelper<Employee>();

const employeesTableColumns = [
  columnHelper.display({
    id: "avatar",
    size: 48,
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
    cell: context => formatEnum(context.getValue()),
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

export default employeesTableColumns;