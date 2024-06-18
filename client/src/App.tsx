import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AuthenticatedRoute from "src/common/routes/AuthenticatedRoute"
import ProjectsIndex from "src/projects/routes/Index"
import NavbarRoute from "src/common/routes/NavbarRoute"
import EmployeesIndex from "src/employees/Index";
import ProjectCreate from "src/projects/routes/Create";
import ProjectDetails from "src/projects/routes/Details";
import ProjectUpdate from "src/projects/routes/Update";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<AuthenticatedRoute />}>
          <Route path="" element={<NavbarRoute />} >
            <Route path="" element={<Navigate to="projects" replace />} />
            <Route path="projects">
              <Route path="" element={<ProjectsIndex />} />
              <Route path="create" element={<ProjectCreate />} />
              <Route path=":id" element={<ProjectDetails />} />
              <Route path=":id/update" element={<ProjectUpdate />} />
            </Route>
            <Route path="employees" element={<EmployeesIndex />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
