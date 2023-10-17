import { useContext } from "react"
import { ProjectContext } from "../context/ProjectContext"
import { UserContext } from "../context/UserContext"

function ProjectDropdown() {
  const { currentProject, setCurrentProject } = useContext(ProjectContext)
  const { currentUser } = useContext(UserContext)

  const handleSelectProject = (e) => {
    setCurrentProject((currentProject => currentProject = e.target.value))
  }
  return (
    <div className="dropdown wrapper">
      <select onChange={handleSelectProject} className="select-project">
            <option value={currentProject}>{currentProject}</option>
            {currentUser && currentUser.projects.filter(p => p.project_name !== currentProject).map((p) => (
                <option key={p.id} value={p.project_name}>
                  {p.project_name}
                </option>
            ))}
      </select> 
    </div>
    )
  }
  
  export default ProjectDropdown