import { Link, useParams } from "react-router-dom";
import AvatarSize from "src/common/constants/AvatarSize";
import EmployeeBriefComponent from "src/employees/components/EmployeeBriefComponent";
import useEmployeeQuery from "src/employees/hooks/useEmployeeQuery";
import useMeQuery from "src/common/hooks/useMeQuery";
import { canManageEmployees } from "src/common/utility/policies";
import Scaffold from "src/common/components/Scaffold";
import EmployeeAvatar from "src/employees/components/EmployeeAvatar";

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
            <div className="mb-3">
              <EmployeeAvatar size={AvatarSize.Large} />
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" id="fullName" placeholder="Full name" defaultValue={employee.fullName} readOnly />
              <label htmlFor="fullName">Full name</label>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" id="subdivision" type="text" placeholder="Subdivision" defaultValue={employee.subdivision} readOnly />
              <label htmlFor="subdivision">Subdivision</label>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" id="position" type="text" placeholder="Position" defaultValue={employee.position} readOnly />
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
                  <EmployeeBriefComponent className="border rounded-5" employee={employee.peoplePartner} avatarSize={AvatarSize.Normal} />
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