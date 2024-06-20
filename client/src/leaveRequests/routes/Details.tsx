import { Link, useParams } from "react-router-dom";
import useLeaveRequestQuery from "src/leaveRequests/hooks/useLeaveRequestQuery";
import useMeQuery from "src/common/hooks/useMeQuery";
import { canMakeLeaveRequests } from "src/common/utility/policies";
import Scaffold from "src/common/components/Scaffold";
import ApprovalRequestBriefComponent from "src/approvalRequests/components/ApprovalRequestBriefComponent";
import { useEffect, useState } from "react";
import useLeaveRequestUpdateCommentMutation from "src/leaveRequests/hooks/useLeaveRequestUpdateCommentMutation";
import useLeaveRequestCancelMutation from "src/leaveRequests/hooks/useLeaveRequestCancelMutation";

function LeaveRequestDetails() {
  const { id } = useParams();

  const { data: me } = useMeQuery();

  const { data: leaveRequest, dataUpdatedAt } = useLeaveRequestQuery(id == undefined ? undefined : Number.parseInt(id));
  const { mutate: updateComment } = useLeaveRequestUpdateCommentMutation();
  const { mutate: cancel } = useLeaveRequestCancelMutation();

  const [comment, setComment] = useState("");

  const hasCommentChanged = (leaveRequest?.comment ?? "") != comment;
  const canSaveChanges = canMakeLeaveRequests(me) && hasCommentChanged;
  const canCancel = canMakeLeaveRequests(me) && leaveRequest?.status == "Submitted";

  const handleSaveChangesClick = () => {
    if (leaveRequest) {
      updateComment({
        id: leaveRequest.id,
        comment
      });
    }
  }

  const handleCancelRequestClick = () => {
    if (leaveRequest) {
      cancel({ id: leaveRequest.id });
    }
  }

  useEffect(() => {
    if (leaveRequest) {
      setComment(leaveRequest.comment ?? "");
    }
  }, [leaveRequest]);

  return (
    <Scaffold>
      <div className="rounded bg-white p-5">
        <h4 className="mb-3">Leave request</h4>
        {
          leaveRequest &&
          <>
            <div className="form-floating mb-3">
              <input className="form-control" id="id" type="text" placeholder="Id" defaultValue={leaveRequest.id} readOnly />
              <label htmlFor="id">Id</label>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" id="type" type="text" placeholder="Absence reason" defaultValue={leaveRequest.absenceReason} readOnly />
              <label htmlFor="type">Absence reason</label>
            </div>
            <div className="row mb-3">
              <label className="col-2 col-form-label" htmlFor="startDate">Start date</label>
              <div className="col-3">
                <input className="form-control" id="startDate" type="text" defaultValue={leaveRequest.startDate} readOnly />
              </div>
              <div className="col-2" />
              <label className="col-2 col-form-label" htmlFor="endDate">End date</label>
              <div className="col-3">
                <input className="form-control" id="endDate" type="text" defaultValue={leaveRequest.endDate} readOnly />
              </div>
            </div>
            <div className="form-floating mb-3">
              <input key={dataUpdatedAt} className="form-control" id="status" type="text" defaultValue={leaveRequest.status} readOnly />
              <label htmlFor="status">Status</label>
            </div>
            <div className="form-floating mb-3">
              {
                canMakeLeaveRequests(me) ?
                  <textarea className="form-control" id="comment" placeholder="Comment" value={comment} onInput={e => setComment(e.currentTarget.value)} /> :
                  <textarea className="form-control" id="comment" placeholder="Comment" defaultValue={comment} readOnly />
              }
              <label htmlFor="comment">Comment</label>
            </div>
            <div className="mb-3">
              Approval requests
            </div>
            {
              leaveRequest.approvalRequests.length == 0 ?
                <div className="mb-3 fs-7">
                  No approval requests found
                </div> :
                <div className="mb-3 vstack gap-3">
                  {leaveRequest.approvalRequests.map(e => <ApprovalRequestBriefComponent key={e.id} approvalRequest={e} />)}
                </div>
            }
          </>
        }
        <div className="d-flex gap-3">
          <Link className="btn btn-primary fs-6" to="/leaveRequests">Back to list</Link>
          {canCancel && <button className="btn btn-warning fs-6" onClick={handleCancelRequestClick}>Cancel request</button>}
          {canSaveChanges && <button className="btn btn-success fs-6" onClick={handleSaveChangesClick}>Save changes</button>}
        </div>
      </div>
    </Scaffold>
  );
}

export default LeaveRequestDetails;