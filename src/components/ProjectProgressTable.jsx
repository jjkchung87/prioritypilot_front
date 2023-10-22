import { Header,Icon } from "semantic-ui-react"
import { ProjectContext } from "../context/ProjectContext"
import { useContext, useEffect, useState } from "react"



function ProjectProgressTable({userTasks}) {
  const { currentProject } = useContext(ProjectContext)
  const [progress, setProgress] = useState(null)
  const [tasks, setTasks] = useState(userTasks)

  useEffect(()=> {
	if (currentProject) {
	  setTasks([...currentProject.tasks])
	}
	let complete = 0
	let inProgress = 0
	let notStarted = 0
	for (let task of tasks) {
	  if (task.status === 'Complete') {
		complete ++
	  } else if (task.status === 'In Progress') {
		inProgress++
	  } else {
		notStarted++
	  }
	} 
	setProgress({complete: complete, inProgress: inProgress, notStarted: notStarted})
	}, [currentProject, tasks])

	return (
		<div className="table">
		  <Header>Project Progress</Header>
		  {!currentProject ? <p>Please select a project...</p> :
		  <div>
				{currentProject.tasks.length > 0 ?
					<>
					<p>Project Tasks</p>
					<p>
						<span className="status-color"><Icon color='blue' name='square' />Complete </span>
						<span className="status-color"><Icon color='purple' name='square' />In Progress </span>
						<span className="status-color"><Icon color='grey' name='square' />Not Started </span>
					</p>
					<div className="progress-bar">
						<div className="completed-tasks" style={{width: `${progress.complete/currentProject.tasks.length*100}%`}}>{progress.complete}</div>
						<div className="in-progress-tasks" style={{width: `${progress.inProgress/currentProject.tasks.length*100}%`}}>{progress.inProgress}</div>
						<div className="not-started-tasks" style={{width: `${progress.notStarted/currentProject.tasks.length*100}%`}}>{progress.notStarted}</div>
					</div>
				  </> :
				<Header>Project "{currentProject.project_name}" does not have any tasks yet.</Header>	}
				{/* <span><Progress fluid="true" percent={45} progress /></span> */}
		</div>}
		</div>
	)
	}
  
export default ProjectProgressTable