import Scaffold from "src/common/components/Scaffold";
import ApprovalRequestsTable from "src/approvalRequests/components/ApprovalRequestsTable";
import useMeQuery from "src/common/hooks/useMeQuery";

function ApprovalRequestsIndex() {
  const { data: me } = useMeQuery();

  return (
    <Scaffold>
      <ApprovalRequestsTable showApprover={me?.position == "Administrator"}/>
    </Scaffold>
  );
}

export default ApprovalRequestsIndex;