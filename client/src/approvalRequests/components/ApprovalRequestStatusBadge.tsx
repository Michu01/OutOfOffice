function ApprovalRequestStatusBadge({ status }: { status: string }) {
  const type = (() => {
    switch (status) {
      case "Rejected": return "danger";
      case "Approved": return "success";
      case "Canceled": return "warning";
      case "New": return "primary"
    }
  })();

  return <span className={`badge fs-7 text-bg-${type}`}>{status}</span>;
}

export default ApprovalRequestStatusBadge;