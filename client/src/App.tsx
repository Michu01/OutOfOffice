import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AuthenticatedRoute from "./routes/AuthenticatedRoute"
import ProjectsIndex from "./routes/projects/Index"
import NavbarRoute from "./routes/NavbarRoute"
import EmployeesIndex from "./routes/employees/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<AuthenticatedRoute />}>
          <Route path="" element={<NavbarRoute />} >
            <Route path="" element={<Navigate to="projects" replace />} />
            <Route path="projects" element={<ProjectsIndex />} />
            <Route path="employees" element={<EmployeesIndex />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
