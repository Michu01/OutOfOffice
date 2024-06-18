import { PaginationState, ColumnFiltersState, SortingState, createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import Table from "../../../components/Table";
import useProjectsQuery from "../hooks/useProjectsQuery";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import AvatarSize from "../../../constants/AvatarSize";
import EmployeeBriefComponent from "../../employees/EmployeeBriefComponent";

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

function ProjectsTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isFetching } = useProjectsQuery(pagination, columnFilters, sorting);

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

export default ProjectsTable;