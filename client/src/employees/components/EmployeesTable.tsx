import Table from "src/common/components/Table";
import useEmployeesQuery from "src/employees/hooks/useEmployeesQuery";
import employeesTableColumns from "src/employees/constants/employeesTableColumns";

function EmployeesTable() {
  const initialColumnSort = {
    id: "fullName",
    desc: false
  }

  return (
    <Table
      initialColumnSort={initialColumnSort}
      columns={employeesTableColumns}
      useDataQuery={useEmployeesQuery}
    />
  );
}

export default EmployeesTable;