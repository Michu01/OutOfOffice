import { RowModel, flexRender } from "@tanstack/react-table";

function TableBody({ rowModel }: { rowModel: RowModel<any> }) {
  return (
    <tbody>
      {rowModel.rows.map(row => (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;