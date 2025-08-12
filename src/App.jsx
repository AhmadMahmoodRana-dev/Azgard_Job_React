import { Route, Routes } from "react-router-dom"
import JobDetail from "./pages/JobDetail"
import JobList from "./pages/JobList"

const App = () => {
  return (
    <div>
 <Routes>
  <Route path="/" element={<JobList />} />
  <Route path="/jobdetail/:id" element={<JobDetail />} />
  <Route path="/jobdetail" element={<JobDetail />} />
 </Routes>
    </div>
  )
}

export default App