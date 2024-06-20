import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AuthenticatedRoute from "src/common/routes/AuthenticatedRoute"
import ProjectsIndex from "src/projects/routes/Index"
import NavbarRoute from "src/common/routes/NavbarRoute"
import EmployeesIndex from "src/employees/routes/Index";
import ProjectCreate from "src/projects/routes/Create";
import ProjectDetails from "src/projects/routes/Details";
import ProjectUpdate from "src/projects/routes/Update";
import EmployeeDetails from "src/employees/routes/Details";
import EmployeeAdd from "src/employees/routes/Add";
import EmployeeUpdate from "src/employees/routes/Update";
import LeaveRequestsIndex from "src/leaveRequests/routes/Index";
import LeaveRequestDetails from "src/leaveRequests/routes/Details";

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
            <Route path="employees">
              <Route path="" element={<EmployeesIndex />} />
              <Route path="add" element={<EmployeeAdd />} />
              <Route path=":id" element={<EmployeeDetails />} />
              <Route path=":id/update" element={<EmployeeUpdate />} />
            </Route>
            <Route path="leaveRequests">
              <Route path="" element={<LeaveRequestsIndex />} />
              <Route path=":id" element={<LeaveRequestDetails />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
