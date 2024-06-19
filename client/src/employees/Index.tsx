import Scaffold from "src/common/components/Scaffold";
import EmployeesTable from "src/employees/EmployeesTable";
import AddEmployeeButton from "src/employees/AddEmployeeButton";
import useMeQuery from "src/common/hooks/useMeQuery";
import { canManageEmployees } from "src/common/utility/policies";

function EmployeesIndex() {
  const { data: me } = useMeQuery();

  return (
    <Scaffold showFloatingAction={canManageEmployees(me)} floatingAction={<AddEmployeeButton />}>
      <EmployeesTable />
    </Scaffold>
  );
}

export default EmployeesIndex;