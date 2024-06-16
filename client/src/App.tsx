import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthenticatedRoute from "./routes/AuthenticatedRoute"
import ProjectsIndex from "./routes/projects/Index"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<AuthenticatedRoute />}>
          <Route element={<ProjectsIndex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
