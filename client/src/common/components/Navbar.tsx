import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import EmployeeBriefComponent from "src/employees/components/EmployeeBriefComponent";
import useMeQuery from "src/common/hooks/useMeQuery";
import useSignOutMutation from "src/common/hooks/useSignOutMutation";
import AvatarSize from "src/common/constants/AvatarSize";
import { canViewEmployees } from "src/common/utility/policies";

function Navbar() {
  const { pathname } = useLocation();

  const { data: me } = useMeQuery();

  const { mutate: signOut } = useSignOutMutation();

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><HiMiniBuildingOffice2 /> Out of Office</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${pathname == '/projects' && 'active'}`} to="projects">Projects</Link>
            </li>
            {
              canViewEmployees(me) &&
              <li className="nav-item">
                <Link className={`nav-link ${pathname == '/employees' && 'active'}`} to="employees">Employees</Link>
              </li>
            }
            <li className="nav-item">
              <Link className={`nav-link ${pathname == '/leaveRequests' && 'active'}`} to="leaveRequests">Leave requests</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname == '/approvalRequests' && 'active'}`} to="approvalRequests">Approval requests</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {me && <EmployeeBriefComponent className="text-white me-3" showPosition employee={me} avatarSize={AvatarSize.Normal} />}
            <div>
              <button className="btn btn-secondary my-2 my-sm-0" type="button" onClick={_ => signOut()}>Sign out</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;