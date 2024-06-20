import { Link, useParams } from "react-router-dom";
import AvatarSize from "src/common/constants/AvatarSize";
import EmployeeBriefComponent from "src/employees/components/EmployeeBriefComponent";
import useProjectQuery from "src/projects/hooks/useProjectQuery";
import useMeQuery from "src/common/hooks/useMeQuery";
import { canManageProjects } from "src/common/utility/policies";
import Scaffold from "src/common/components/Scaffold";
import CollapseButton from "src/common/components/CollapseButton";

function ProjectDetails() {
  const { id } = useParams();

  const { data: me } = useMeQuery();

  const { data: project } = useProjectQuery(id == undefined ? undefined : Number.parseInt(id));

  return (
    <Scaffold>
      <div className="rounded bg-white p-5">
        {
          project &&
          <>
            <h4 className="mb-3">{project.name}</h4>
            <div className="form-floating mb-3">
              <input className="form-control" id="type" type="text" placeholder="Type" defaultValue={project.type} readOnly />
              <label htmlFor="type">Type</label>
            </div>
            <div className="row mb-3">
              <label className="col-2 col-form-label" htmlFor="startDate">Start date</label>
              <div className="col-3">
                <input className="form-control" id="startDate" type="text" defaultValue={project.startDate} readOnly />
              </div>
              <div className="col-2" />
              <label className="col-2 col-form-label" htmlFor="endDate">End date</label>
              <div className="col-3">
                <input className="form-control" id="endDate" type="text" defaultValue={project.endDate} readOnly />
              </div>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" id="status" type="text" defaultValue={project.status} readOnly />
              <label htmlFor="status">Status</label>
            </div>
            <div className="form-floating mb-3">
              <textarea className="form-control" id="comment" placeholder="Comment" defaultValue={project.comment} readOnly />
              <label htmlFor="comment">Comment</label>
            </div>
            <div className="mb-3">
              Project manager
            </div>
            <div className="mb-3">
              <EmployeeBriefComponent employee={project.projectManager} avatarSize={AvatarSize.Large} />
            </div>
            <div className="mb-3">
              Employees <CollapseButton target="#employees" />
            </div>
            {
              project.employees.length == 0 ?
                <div className="mb-3 fs-7">
                  No employees found
                </div> :
                <div id="employees" className="collapse mb-3 vstack gap-3">
                  {project.employees.map(e => <EmployeeBriefComponent key={e.id} avatarSize={AvatarSize.Normal} employee={e} />)}
                </div>
            }
          </>
        }
        <div className="d-flex gap-3">
          <Link className="btn btn-primary fs-6" to="/projects">Back to list</Link>
          {canManageProjects(me) && <Link className="btn btn-warning fs-6" to="update">Update project</Link>}
        </div>
      </div>
    </Scaffold>
  );
}

export default ProjectDetails;