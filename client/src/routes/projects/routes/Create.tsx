import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import ProjectFormInputs from "../models/ProjectFormInputs";
import useCreateProjectMutation from "../hooks/useCreateProjectMutation";
import Scaffold from "../../../components/Scaffold";

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