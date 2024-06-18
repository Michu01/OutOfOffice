import useMeQuery from "../../../hooks/useMeQuery";
import { canManageProjects } from "../../../utility/policies";
import Scaffold from "../../../components/Scaffold";
import ProjectsTable from "../components/ProjectsTable";
import CreateProjectButton from "../components/CreateProjectButton";

function ProjectsIndex() {
  const { data: me } = useMeQuery();

  return (
    <Scaffold showFloatingAction={canManageProjects(me)} floatingAction={<CreateProjectButton />}>
      <ProjectsTable/>
    </Scaffold>
  );
}

export default ProjectsIndex;