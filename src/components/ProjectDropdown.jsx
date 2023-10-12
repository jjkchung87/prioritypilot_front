import { useState } from "react"

const projects = ['Project1', 'Project 2', 'Project 3', 'Custom Tasks']
function ProjectDropdown() {
  const [project, setProject] = useState()
  const handleSelectProject = (e) => {
    setProject(p => e.target.value)
  }
  return (
    <div className="dropdown wrapper">
      <select onChange={handleSelectProject} className="select-project">
            {projects.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
            ))}
      </select> 
    </div>
    )
  }
  
  export default ProjectDropdown