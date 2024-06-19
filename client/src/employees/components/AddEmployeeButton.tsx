import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function AddEmployeeButton() {
  return (
    <Link className="btn btn-success fs-5 d-flex align-items-center" to="add">
      <FaPlus /><span className="ms-2">Add employee</span>
    </Link>
  );
}

export default AddEmployeeButton;