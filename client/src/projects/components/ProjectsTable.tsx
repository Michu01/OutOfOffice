import Table from "src/common/components/Table";
import useProjectsQuery from "src/projects/hooks/useProjectsQuery";
import projectsTableColumns from "../constants/projectsTableColumns";

function ProjectsTable() {
  const initialColumnSort = {
    id: "startDate",
    desc: true
  }

  return (
    <Table
      initialColumnSort={initialColumnSort}
      columns={projectsTableColumns}
      useDataQuery={useProjectsQuery}
    />
  );
}

export default ProjectsTable;