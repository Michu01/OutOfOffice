import Table from "src/common/components/Table";
import useLeaveRequestsQuery from "src/leaveRequests/hooks/useLeaveRequestsQuery";
import leaveRequestsTableColumns from "src/leaveRequests/constants/leaveRequestsTableColumns";

function LeaveRequestsTable() {
  const initialColumnSort = {
    id: "startDate",
    desc: true
  }

  return (
    <Table
      initialColumnSort={initialColumnSort}
      columns={leaveRequestsTableColumns}
      useDataQuery={useLeaveRequestsQuery}
    />
  );
}

export default LeaveRequestsTable;