import EmployeeBriefComponent from "src/employees/components/EmployeeBriefComponent";
import ApprovalRequest from "src/approvalRequests/models/ApprovalRequest";
import AvatarSize from "src/common/constants/AvatarSize";
import ApprovalRequestStatusBadge from "src/approvalRequests/components/ApprovalRequestStatusBadge";

function ApprovalRequestBriefComponent({ approvalRequest }: { approvalRequest: ApprovalRequest }) {
  return (
    <div className="d-flex flex-row align-items-center gap-3">
      <EmployeeBriefComponent avatarSize={AvatarSize.Normal} employee={approvalRequest.approver}/>
      <ApprovalRequestStatusBadge status={approvalRequest.status} />
    </div>
  );
}

export default ApprovalRequestBriefComponent;