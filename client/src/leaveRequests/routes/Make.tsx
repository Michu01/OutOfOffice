import { useNavigate } from "react-router-dom";
import Scaffold from "src/common/components/Scaffold";
import LeaveRequestFormInputs from "src/leaveRequests/models/LeaveRequestFormInputs";
import LeaveRequestForm from "src/leaveRequests/components/LeaveRequestForm";
import useLeaveRequestMakeMutation from "src/leaveRequests/hooks/useLeaveRequestMakeMutation";

function LeaveRequestMake() {
  const { mutate, isSuccess, data } = useLeaveRequestMakeMutation();

  const navigate = useNavigate();

  if (isSuccess) {
    navigate(`/leaveRequests/${data.id}`);
  }

  const handleSubmit = (e: LeaveRequestFormInputs) => mutate(e);

  return (
    <Scaffold>
      <div className="rounded bg-white p-5">
        <LeaveRequestForm onSubmit={handleSubmit} />
      </div>
    </Scaffold>
  );
}

export default LeaveRequestMake; 