import useMeQuery from "src/common/hooks/useMeQuery";
import { canMakeLeaveRequests } from "src/common/utility/policies";
import Scaffold from "src/common/components/Scaffold";
import MakeLeaveRequestButton from "src/leaveRequests/components/MakeLeaveRequestButton";
import LeaveRequestsTable from "src/leaveRequests/components/LeaveRequestsTable";

function LeaveRequestsIndex() {
  const { data: me } = useMeQuery();

  return (
    <Scaffold showFloatingAction={canMakeLeaveRequests(me)} floatingAction={<MakeLeaveRequestButton />}>
      <LeaveRequestsTable/>
    </Scaffold>
  );
}

export default LeaveRequestsIndex;