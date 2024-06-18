import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AuthenticatedRoute from "./routes/AuthenticatedRoute"
import ProjectsIndex from "./routes/projects/routes/Index"
import NavbarRoute from "./routes/NavbarRoute"
import EmployeesIndex from "./routes/employees/Index";
import ProjectCreate from "./routes/projects/routes/Create";
import ProjectDetails from "./routes/projects/routes/Details";
import ProjectUpdate from "./routes/projects/routes/Update";

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
