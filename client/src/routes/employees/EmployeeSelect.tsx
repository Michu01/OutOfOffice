import useEmployeesQuery from "./useEmployeesQuery";
import { useState } from "react";
import EmployeeBriefComponent from "./EmployeeBriefComponent";
import AvatarSize from "../../constants/AvatarSize";
import DebouncedSelect from "../../components/DebouncedSelect";

type Props = {
  onChange: (employee: Employee) => void;
}

function EmployeeSelect(props: Props) {
  const { onChange } = props;

  const [value, _] = useState<Employee | null>(null);
  const [input, setInput] = useState("");

  const pagination = {
    pageIndex: 0,
    pageSize: 10
  };

  const filters = [
    { id: "getAll", value: true },
    { id: "position", value: "Employee" },
    { id: "fullName", value: input }
  ];

  const sorting = [
    { id: "fullName", desc: false }
  ];

  const { data } = useEmployeesQuery(pagination, filters, sorting);

  const { items: options } = data || {};

  return (
    <DebouncedSelect
      placeholder="Add employee"
      isSearchable
      value={value}
      inputValue={input}
      filterOption={null}
      onInputChange={setInput}
      onChange={(e: Employee | null) => e != null && onChange(e)}
      options={options}
      formatOptionLabel={(data: Employee, _: any) => <EmployeeBriefComponent avatarSize={AvatarSize.Small} employee={data} />}
    />
  );
}

export default EmployeeSelect;