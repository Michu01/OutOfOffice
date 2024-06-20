import { Link, useParams } from "react-router-dom";
import AvatarSize from "src/common/constants/AvatarSize";
import EmployeeBriefComponent from "src/employees/components/EmployeeBriefComponent";
import useEmployeeQuery from "src/employees/hooks/useEmployeeQuery";
import useMeQuery from "src/common/hooks/useMeQuery";
import { canManageEmployees } from "src/common/utility/policies";
import Scaffold from "src/common/components/Scaffold";
import CollapseButton from "src/common/components/CollapseButton";
import formatEnum from "src/common/utility/formatEnum";

function EmployeeDetails() {
  const { id } = useParams();

  const { data: me } = useMeQuery();

  const { data: employee } = useEmployeeQuery(id == undefined ? undefined : Number.parseInt(id));

  return (
    <Scaffold>
      <div className="rounded bg-white p-5">
        {
          employee &&
          <>
            <EmployeeBriefComponent className="mb-3" fullNameClassName="h4 mb-0" employee={employee} avatarSize={AvatarSize.Large} />
            <div className="form-floating mb-3">
              <input className="form-control" id="subdivision" type="text" placeholder="Subdivision" defaultValue={employee.subdivision} readOnly />
              <label htmlFor="subdivision">Subdivision</label>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" id="position" type="text" placeholder="Position" defaultValue={formatEnum(employee.position)} readOnly />
              <label htmlFor="position">Position</label>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" id="status" type="text" placeholder="Status" defaultValue={employee.status} readOnly />
              <label htmlFor="status">Status</label>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" id="outOfOfficeBalance" type="text" placeholder="Out of office balance" defaultValue={employee.outOfOfficeBalance} readOnly />
              <label htmlFor="outOfOfficeBalance">Out of office balance</label>
            </div>
            {
              employee.peoplePartner &&
              <>
                <div className="mb-3">
                  People partner
                </div>
                <div className="mb-3">
                  <EmployeeBriefComponent employee={employee.peoplePartner} avatarSize={AvatarSize.Normal} />
                </div>
              </>
            }
            {
              employee.position == "Employee" &&
              <>
                <div className="mb-3">
                  Projects <CollapseButton target="#projects" />
                </div>
                <div id="projects" className="mb-3 collapse vstack gap-3 fs-7">
                  {employee.projects.length == 0 ? "No projects found" : employee.projects.map(e => <span key={e.id}>{e.name}</span>)}
                </div>
              </>
            }
            {
              employee.position == "ProjectManager" &&
              <>
                <div className="mb-3">
                  Managed projects <CollapseButton target="#managedProjects" />
                </div>
                <div id="managedProjects" className="mb-3 collapse vstack gap-3 fs-7">
                  {employee.managedProjects.length == 0 ? "No projects found" : employee.managedProjects.map(e => <span key={e.id}>{e.name}</span>)}
                </div>
              </>
            }
            {
              employee.position == "HRManager" &&
              <>
                <div className="mb-3">
                  Managed employees <CollapseButton target="#managedEmployees" />
                </div>
                <div id="managedEmployees" className="mb-3 collapse vstack gap-3 fs-7">
                  {employee.employees.length == 0 ? "No employees found" : employee.employees.map(e => <span key={e.id}>{e.fullName}</span>)}
                </div>
              </>
            }
          </>
        }
        <div className="d-flex gap-3">
          <Link className="btn btn-primary fs-6" to="/employees">Back to list</Link>
          {canManageEmployees(me) && <Link className="btn btn-warning fs-6" to="update">Update employee</Link>}
        </div>
      </div>
    </Scaffold>
  );
}

export default EmployeeDetails;