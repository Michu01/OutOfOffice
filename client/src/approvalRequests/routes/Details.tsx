import { Link, useParams } from "react-router-dom";
import useMeQuery from "src/common/hooks/useMeQuery";
import { canManageApprovalRequests } from "src/common/utility/policies";
import Scaffold from "src/common/components/Scaffold";
import { useEffect, useState } from "react";
import useApprovalRequestQuery from "src/approvalRequests/hooks/useApprovalRequestQuery";
import useApprovalRequestApproveMutation from "src/approvalRequests/hooks/useApprovalRequestApproveMutation";
import useApprovalRequestRejectMutation from "src/approvalRequests/hooks/useApprovalRequestRejectMutation";
import useApprovalRequestUpdateCommentMutation from "src/approvalRequests/hooks/useApprovalRequestUpdateCommentMutation";

function ApprovalRequestDetails() {
  const { id } = useParams();

  const { data: me } = useMeQuery();

  const { data: approvalRequest, dataUpdatedAt } = useApprovalRequestQuery(id == undefined ? undefined : Number.parseInt(id));
  const { mutate: updateComment } = useApprovalRequestUpdateCommentMutation();
  const { mutate: approve } = useApprovalRequestApproveMutation();
  const { mutate: reject } = useApprovalRequestRejectMutation();

  const [comment, setComment] = useState("");

  const hasCommentChanged = (approvalRequest?.comment ?? "") != comment;

  const canSaveChanges = canManageApprovalRequests(me) && hasCommentChanged;
  const canApproveAndReject = canManageApprovalRequests(me) && approvalRequest?.status == "New";

  const handleSaveChangesClick = () => {
    if (approvalRequest) {
      updateComment({
        id: approvalRequest.id,
        comment
      });
    }
  }

  const handleApproveRequestClick = () => {
    if (approvalRequest) {
      approve({ id: approvalRequest.id });
    }
  }

  const handleRejectRequestClick = () => {
    if (approvalRequest) {
      reject({ id: approvalRequest.id });
    }
  }

  useEffect(() => {
    if (approvalRequest) {
      setComment(approvalRequest.comment ?? "");
    }
  }, [approvalRequest]);

  return (
    <Scaffold>
      <div className="rounded bg-white p-5">
        <h4 className="mb-3">Approval request</h4>
        {
          approvalRequest &&
          <>
            <div className="form-floating mb-3">
              <input className="form-control" id="id" type="text" placeholder="Id" defaultValue={approvalRequest.id} readOnly />
              <label htmlFor="id">Id</label>
            </div>
            <div className="form-floating mb-3">
              <input key={dataUpdatedAt} className="form-control" id="status" type="text" defaultValue={approvalRequest.status} readOnly />
              <label htmlFor="status">Status</label>
            </div>
            <div className="form-floating mb-3">
              <textarea className="form-control" id="comment" placeholder="Comment" value={comment} onInput={e => setComment(e.currentTarget.value)} />
              <label htmlFor="comment">Comment</label>
            </div>
          </>
        }
        <div className="d-flex gap-3">
          <Link className="btn btn-primary fs-6" to="/approvalRequests">Back to list</Link>
          {
            canApproveAndReject &&
            <>
              <button className="btn btn-danger fs-6" onClick={handleRejectRequestClick}>Reject request</button>
              <button className="btn btn-success fs-6" onClick={handleApproveRequestClick}>Approve request</button>
            </>
          }
          {canSaveChanges && <button className="btn btn-success fs-6" onClick={handleSaveChangesClick}>Save changes</button>}
        </div>
      </div>
    </Scaffold>
  );
}

export default ApprovalRequestDetails;