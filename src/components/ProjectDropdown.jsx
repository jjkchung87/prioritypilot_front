import { useContext } from "react"
import { ProjectContext, ProjectsContext } from "../context/ProjectContext"

function ProjectDropdown() {
  const { currentProject, setCurrentProject } = useContext(ProjectContext)
  const { projects } = useContext(ProjectsContext)
  
  //sets current project on select
  const handleSelectProject = (e) => {
    let current = projects.filter(p => p.project_name === e.target.value)[0]
    setCurrentProject(current)
  }

  return (
    <div className="dropdown">
      <select onChange={handleSelectProject} className="select-project">
        {!currentProject ? 
        <>
          <option value='Select Project'>Select Project</option>
          {projects && projects.map(p => <option key={p.id} value={p.project_name}>{p.project_name}</option>)}
        </> :
        <>
          <option value={currentProject.project_name}>{currentProject.project_name}</option> 
          {projects.filter(p => p.project_name !== currentProject.project_name).map(p => <option key={p.id} value={p.project_name}>{p.project_name}</option>)}
        </>}
      </select> 
    </div>
    )
  }
  
  export default ProjectDropdown