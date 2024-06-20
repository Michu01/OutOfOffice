import { createColumnHelper } from "@tanstack/react-table";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import AvatarSize from "src/common/constants/AvatarSize";
import EmployeeBriefComponent from "src/employees/components/EmployeeBriefComponent";

const columnHelper = createColumnHelper<Project>();

const projectsTableColumns = [
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
    sortDescFirst: true,
    cell: context => context.getValue() ? context.renderValue() : "-"
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
  columnHelper.accessor('projectManager', {
    header: "Project manager",
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

export default projectsTableColumns;