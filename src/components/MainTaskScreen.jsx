import { Tab, Card, Header } from 'semantic-ui-react'
import TaskCard from './TaskCard'
import NewTaskForm from './NewTaskForm'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { ProjectContext, ProjectsContext } from '../context/ProjectContext'
import UserApi from '../api'
import {v4 as uuid} from 'uuid';
import Carousel from 'react-grid-carousel'

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
          //if currentProject selected - show tasks for that project
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
      { userTasks.filter(task => task.status !== 'Complete').length > 0 ?
        <Carousel cols={2} rows={2} gap={10} loop className='carousel'>
          {userTasks.filter(task => task.status !== 'Complete').map(task => (
            <Carousel.Item className='carousel-item'>
              <TaskCard key={uuid()} task={task} setTasks={setUserTasks} tasks={userTasks}/>
            </Carousel.Item>))}
        </Carousel>:
        <Header>You do not have any tasks.</Header> }
        </Tab.Pane> },
    { menuItem: 'Today', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'This Week', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }, 
    { menuItem: 'Completed Tasks', render: () => <Tab.Pane>
      {userTasks.filter(task => task.status === 'Complete').length > 0 ?
        <Card.Group itemsPerRow={2}>
          {userTasks.filter(task => task.status === 'Complete').map(task => <TaskCard key={uuid()} task={task}/>)}
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