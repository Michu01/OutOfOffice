import { useNavigate, useParams } from "react-router-dom";
import Scaffold from "src/common/components/Scaffold";
import useEmployeeQuery from "src/employees/useEmployeeQuery";
import EmployeeForm from "src/employees/EmployeeForm";
import EmployeeFormInputs from "src/employees/EmployeeFormInputs";
import useUpdateEmployeeMutation from "src/employees/useUpdateEmployeeMutation";

function EmployeeUpdate() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: employee, dataUpdatedAt } = useEmployeeQuery(id == undefined ? undefined : Number.parseInt(id));

  const { mutate, isSuccess, data } = useUpdateEmployeeMutation();

  if (isSuccess) {
    navigate(`/employees/${data.id}`);
  }

  const handleSubmit = (e: EmployeeFormInputs) => mutate(e);

  return (
    <Scaffold>
      <div className="rounded bg-white p-5">
        {employee && <EmployeeForm key={`employee-form-${dataUpdatedAt}`} action="update" employee={employee} onSubmit={handleSubmit} />}
      </div>
    </Scaffold>
  );
}

export default EmployeeUpdate;