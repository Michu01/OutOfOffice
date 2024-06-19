import { useNavigate, useParams } from "react-router-dom";
import Scaffold from "src/common/components/Scaffold";
import useEmployeeQuery from "src/employees/hooks/useEmployeeQuery";
import EmployeeForm from "src/employees/components/EmployeeForm";
import EmployeeFormInputs from "src/employees/models/EmployeeFormInputs";
import useUpdateEmployeeMutation from "src/employees/hooks/useUpdateEmployeeMutation";

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