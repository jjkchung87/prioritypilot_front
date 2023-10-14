import { useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"


function ProjectDropdown() {
  const { currentUser } = useContext(UserContext)
  const [project, setProject] = useState('Select Project')

  const handleSelectProject = (e) => {
    setProject(e.target.value)
  }
  console.log(currentUser.projects)
  return (
    <div className="dropdown wrapper">
      <select onChange={handleSelectProject} className="select-project">
            {currentUser.projects.map((p) => (
                <option key={p.id} value={project}>
                  {p.project_name}
                </option>
            ))}
      </select> 
    </div>
    )
  }
  
  export default ProjectDropdown