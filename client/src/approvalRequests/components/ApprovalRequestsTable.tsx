import { useMemo } from "react";
import Table from "src/common/components/Table";
import useApprovalRequestsQuery from "src/approvalRequests/hooks/useApprovalRequestsQuery";
import createApprovalRequestsTableColumns from "src/approvalRequests/utility/createApprovalRequestsTableColumns";

function ApprovalRequestsTable({ showApprover }: { showApprover: boolean }) {
  const columns = useMemo(() => createApprovalRequestsTableColumns(showApprover), [showApprover]);

  const initialColumnSort = {
    id: "startDate",
    desc: true
  }

  return (
    <Table
      initialColumnSort={initialColumnSort}
      columns={columns}
      useDataQuery={useApprovalRequestsQuery}
    />
  );
}

export default ApprovalRequestsTable;