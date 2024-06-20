import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function MakeLeaveRequestButton() {
  return (
    <Link className="btn btn-success fs-5 d-flex align-items-center" to="make">
      <FaPlus /><span className="ms-2">Make leave request</span>
    </Link>
  );
}

export default MakeLeaveRequestButton;