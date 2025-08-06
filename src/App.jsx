import { Route, Routes } from "react-router-dom"
import JobDetail from "./pages/JobDetail"
import JobList from "./pages/JobList"

const App = () => {
  return (
    <div>
 <Routes>
  <Route path="/" element={<JobDetail />} />
  <Route path="/joblist" element={<JobList />} />
 </Routes>
    </div>
  )
}

export default App