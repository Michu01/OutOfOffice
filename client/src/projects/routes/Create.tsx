import { useNavigate } from "react-router-dom";
import ProjectForm from "src/projects/components/ProjectForm";
import ProjectFormInputs from "src/projects/models/ProjectFormInputs";
import useCreateProjectMutation from "src/projects/hooks/useCreateProjectMutation";
import Scaffold from "src/common/components/Scaffold";

function ProjectCreate() {
  const { mutate, isSuccess, data } = useCreateProjectMutation();

  const navigate = useNavigate();

  if (isSuccess) {
    navigate(`/projects/${data.id}`);
  }

  const handleSubmit = (e: ProjectFormInputs) => mutate(e);

  return (
    <Scaffold>
      <div className="rounded bg-white p-5">
        <ProjectForm action="create" onSubmit={handleSubmit} />
      </div>
    </Scaffold>
  );
}

export default ProjectCreate; 