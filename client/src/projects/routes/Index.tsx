import useMeQuery from "src/common/hooks/useMeQuery";
import { canManageProjects } from "src/common/utility/policies";
import Scaffold from "src/common/components/Scaffold";
import ProjectsTable from "src/projects/components/ProjectsTable";
import CreateProjectButton from "src/projects/components/CreateProjectButton";

function ProjectsIndex() {
  const { data: me } = useMeQuery();

  return (
    <Scaffold showFloatingAction={canManageProjects(me)} floatingAction={<CreateProjectButton />}>
      <ProjectsTable/>
    </Scaffold>
  );
}

export default ProjectsIndex;