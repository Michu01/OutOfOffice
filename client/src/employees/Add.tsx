import { useNavigate } from "react-router-dom";
import EmployeeForm from "src/employees/EmployeeForm";
import EmployeeFormInputs from "src/employees/EmployeeFormInputs";
import useAddEmployeeMutation from "src/employees/useAddEmployeeMutation";
import Scaffold from "src/common/components/Scaffold";

function EmployeeAdd() {
  const { mutate, isSuccess, data } = useAddEmployeeMutation();

  const navigate = useNavigate();

  if (isSuccess) {
    navigate(`/employees/${data.id}`);
  }

  const handleSubmit = (e: EmployeeFormInputs) => mutate(e);

  return (
    <Scaffold>
      <div className="rounded bg-white p-5">
        <EmployeeForm action="create" onSubmit={handleSubmit} />
      </div>
    </Scaffold>
  );
}

export default EmployeeAdd; 