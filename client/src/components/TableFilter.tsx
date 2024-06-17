import { Column } from "@tanstack/react-table";
import DebouncedInput from "./DebouncedInput";

function TableRangeFilter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      <DebouncedInput
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={value =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
        placeholder="Min"
      />
      <DebouncedInput
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={value =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        placeholder="Max"
      />
    </>
  );
}

function TableSelectFilter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterSelectOptions } = column.columnDef.meta as any ?? {};

  return (
    <select
      className="form-select"
      onChange={e => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {filterSelectOptions.map((e: any) => <option key={e.key} value={e.key}>{e.value}</option>)}
    </select>
  );
}

function TableInputFilter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterInputType, filterInputPlaceholder } = column.columnDef.meta as any ?? {};

  return (
    <DebouncedInput
      onChange={value => column.setFilterValue(value)}
      placeholder={filterInputPlaceholder}
      type={filterInputType}
      value={(columnFilterValue ?? '') as string}
    />
  )
}

function TableFilter({ column }: { column: Column<any, unknown> }) {
  const { filterVariant } = column.columnDef.meta as any ?? {};

  return filterVariant === 'range' ? <TableRangeFilter column={column} /> :
    filterVariant === 'select' ? <TableSelectFilter column={column} /> :
      filterVariant === 'input' ? <TableInputFilter column={column} /> :
        <>Unknonw filter variant</>;
}

export default TableFilter;