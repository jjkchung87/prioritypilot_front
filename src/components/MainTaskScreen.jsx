import { Tab, Card, Form, Header, Dropdown, Input } from 'semantic-ui-react'
import TaskCard from './TaskCard'
import NewTaskForm from './NewTaskForm'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { ProjectContext, ProjectsContext } from '../context/ProjectContext'
import UserApi from '../api'

function MainTaskScreen() {
  const { currentUser } = useContext(UserContext)
  const { currentProject } = useContext(ProjectContext)
  const { projects } = useContext(ProjectsContext)
  const [ userTasks, setUserTasks ] = useState([])
  const [ spinner, setSpinner ] = useState(false)

  
  useEffect(
    function getAllTasks() {
      if (currentUser) {
        async function getUsersTasks() {
        let myTasks = []
        //request all the tasks for the user
        let res = await UserApi.getUsersTasks(currentUser.id)
        //if no current project - display all tasks
        if (currentProject === 'Select Project' || !currentProject) {
          myTasks = res.tasks
        } else {
          //if currentProject selected - show task for that project
          myTasks = currentProject.tasks
        }
        setUserTasks(t => t = [...myTasks])
      }
      getUsersTasks()
    } else {
      setSpinner(true)
    }
  }, [currentProject, projects, currentUser])


  const myPanes = [
    { menuItem: 'All Tasks', render: () => <Tab.Pane className='tab-pane'>
      { userTasks.length > 0 ?
        <Card.Group itemsPerRow={2}>
          {userTasks.map(task => <TaskCard key={task.id} task={task} setTasks={setUserTasks}/>)}
        </Card.Group> :
        <Header>You do not have any tasks.</Header> }
        </Tab.Pane> },
    { menuItem: 'Today', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'This Week', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }, 
    { menuItem: 'Completed Tasks', render: () => <Tab.Pane>
      { userTasks.length > 0 ?
      <Card.Group itemsPerRow={2}>
        {userTasks.map(task => <TaskCard key={task.id} task={task}/>)}
      </Card.Group> :
      <Header>You have not completed any tasks.</Header> }
      </Tab.Pane> }, 
    { menuItem: '+Add New Task', render: () => (
      <Tab.Pane><NewTaskForm/></Tab.Pane> )}]

  return (
    <div className="main-screen wrapper">
      {spinner ? <div>Loading</div> :
      <Tab panes={myPanes} />}
    </div>
  )
}
  
export default MainTaskScreen