import { Column, Header, HeaderGroup, flexRender } from "@tanstack/react-table";
import { FaChevronCircleDown, FaChevronCircleUp, FaMinusCircle } from "react-icons/fa";
import TableFilter from "src/common/components/TableFilter";
import styles from "src/common/styles/_variables.module.scss";
import { IconContext } from "react-icons";

function TableColumnSort({ column }: { column: Column<any, any> }) {
  return (
    <IconContext.Provider value={{ color: styles.colorPrimary, size: "1.5em" }}>
      <span
        className="me-1 user-select-none"
        role="button"
        onClick={column.getToggleSortingHandler()}
        title={
          column.getNextSortingOrder() === 'asc'
            ? 'Sort ascending'
            : column.getNextSortingOrder() === 'desc'
              ? 'Sort descending'
              : 'Clear sort'
        }
      >
        {{
          asc: <FaChevronCircleUp />,
          desc: <FaChevronCircleDown />,
        }[column.getIsSorted() as string] ?? <FaMinusCircle />}
      </span>
    </IconContext.Provider>
  );
}

function TableHeader({ header }: { header: Header<any, any> }) {
  return (
    <th key={header.id} colSpan={header.colSpan} style={{ width: `${header.getSize()}px` }}>
      {
        !header.isPlaceholder &&
        <>
          <div className="text-nowrap mb-1">
            <span className="me-1">
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
            </span>
            {header.column.getCanSort() && <TableColumnSort column={header.column} />}
          </div>
          <div>
            {header.column.getCanFilter() && <TableFilter column={header.column} />}
          </div>
        </>
      }
    </th>
  )
}

function TableHead({ headerGroups }: { headerGroups: HeaderGroup<any>[] }) {
  return (
    <thead>
      {headerGroups.map(headerGroup =>
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => <TableHeader key={header.id} header={header} />)}
        </tr>)}
    </thead>
  );
}

export default TableHead;