import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function CreateProjectButton() {
  return (
    <Link className="btn btn-success fs-5 d-flex align-items-center" to="create">
      <FaPlus /><span className="ms-2">Create project</span>
    </Link>
  );
}

export default CreateProjectButton;