import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import ProjectFormInputs from "../models/ProjectFormInputs";
import useProjectQuery from "../hooks/useProjectQuery";
import useUpdateProjectMutation from "../hooks/useUpdateProjectMutation";
import Scaffold from "../../../components/Scaffold";

function ProjectUpdate() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: project, dataUpdatedAt } = useProjectQuery(id == undefined ? undefined : Number.parseInt(id));

  const { mutate, isSuccess, data } = useUpdateProjectMutation();

  if (isSuccess) {
    navigate(`/projects/${data.id}`);
  }

  const handleSubmit = (e: ProjectFormInputs) => mutate(e);

  return (
    <Scaffold>
      <div className="rounded bg-white p-5">
        {project && <ProjectForm key={`project-form-${dataUpdatedAt}`} action="update" project={project} onSubmit={handleSubmit} />}
      </div>
    </Scaffold>
  );
}

export default ProjectUpdate;