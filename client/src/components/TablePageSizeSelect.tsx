import { ChangeEvent } from "react";

type Props = {
  options?: number[];
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

const defaultOptions = [10, 20, 30, 40, 50];

function TablePageSizeSelect(props: Props) {
  const { options = defaultOptions, pageSize, setPageSize } = props;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.currentTarget.value));
  }

  return (
    <div className="d-flex gap-1">
      <label className="col-auto col-form-label text-white">Show</label>
      <div className="col">
        <select className="form-select" value={pageSize} onChange={handleChange}>
          {options.map(pageSize => <option key={pageSize}>{pageSize}</option>)}
        </select>
      </div>
    </div>
  );
}

export default TablePageSizeSelect;