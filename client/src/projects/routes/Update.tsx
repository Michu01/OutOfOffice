import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "src/projects/components/ProjectForm";
import ProjectFormInputs from "src/projects/models/ProjectFormInputs";
import useProjectQuery from "src/projects/hooks/useProjectQuery";
import useUpdateProjectMutation from "src/projects/hooks/useUpdateProjectMutation";
import Scaffold from "src/common/components/Scaffold";

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