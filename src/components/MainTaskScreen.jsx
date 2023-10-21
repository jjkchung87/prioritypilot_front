import { Tab, Header } from 'semantic-ui-react'
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
  let currentTime = new Date()
 
  //finds all tasks for user on each render
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

  //delete task from db and state
  const deleteTask = async (task_id) => {
    await UserApi.deleteTask(task_id)
    setUserTasks([...tasks => userTasks.filter(t => t.id !== task_id)])
  }
  
  //tabs for tasks
  const myPanes = [

    //All User's Tasks for a current project or all tasks if project not selected
    { menuItem: 'All Tasks', render: () => <Tab.Pane className='tab-pane'>
      {currentProject && <Header>Project: <span className='tab-project-name'>{currentProject.project_name}</span></Header>}
      {userTasks.filter(task => task.status !== 'Complete').length > 0 ?
        <Carousel cols={2} rows={3} gap={10} loop className='carousel'>
          {userTasks.filter(task => task.status !== 'Complete').map(task => (
            <Carousel.Item className='carousel-item' key={uuid()} >
              <TaskCard task={task} setTasks={setUserTasks} tasks={userTasks} deleteTask={deleteTask}/>
            </Carousel.Item>))}
        </Carousel> : 
        <Header>You do not have any tasks.</Header> }
        </Tab.Pane>},

    //Tasks that are due today
    { menuItem: 'Today', render: () => <Tab.Pane className='tab-pane'>
      {currentProject && <Header>Project: <span className='tab-project-name'>{currentProject.project_name}</span></Header>}
      {userTasks.filter(task => (
         new Date(task.end_date).getDate() <= new Date().getDate() && 
         new Date(task.end_date).getMonth() === new Date().getMonth() &&
         task.status !== 'Complete')).length > 0 ?
        <Carousel cols={2} rows={3} gap={10} loop className='carousel'>
          {userTasks.filter(task => (
            new Date(task.end_date).getDate() <= new Date().getDate() && 
            new Date(task.end_date).getMonth() === new Date().getMonth() &&
            task.status !== 'Complete')).map(task => (
              <Carousel.Item className='carousel-item' key={uuid()} >
                <TaskCard task={task} setTasks={setUserTasks} tasks={userTasks} deleteTask={deleteTask}/>
              </Carousel.Item>))}
        </Carousel>:
        <Header>You do not have any tasks that are due today.</Header> }
        </Tab.Pane> },

    //Tasks that are due this week
    { menuItem: 'This Week', render: () => <Tab.Pane className='tab-pane'>
      {currentProject && <Header>Project: <span className='tab-project-name'>{currentProject.project_name}</span></Header>}
      {userTasks.filter(task => (
        new Date(task.end_date).getDate() <= new Date(currentTime.setDate(currentTime.getDate() - currentTime.getDay()+6)) &&
        task.status !== 'Complete')).length > 0 ?
        <Carousel cols={2} rows={3} gap={10} loop className='carousel'>
          {userTasks.filter(task => (
            new Date(task.end_date).getDate() <= new Date(currentTime.setDate(currentTime.getDate() - currentTime.getDay()+6)).getDate() &&
            task.status !== 'Complete')).map(task => (
              <Carousel.Item className='carousel-item' key={uuid()} >
                <TaskCard task={task} setTasks={setUserTasks} tasks={userTasks} deleteTask={deleteTask}/>
              </Carousel.Item>))}
        </Carousel> :
        <Header>You do not any tasks that are due this week.</Header> }
        </Tab.Pane> }, 

    //Completed Tasks
    { menuItem: 'Completed Tasks', render: () => <Tab.Pane className='tab-pane'>
      {currentProject && <Header>Project: <span className='tab-project-name'>{currentProject.project_name}</span></Header>}
      {userTasks.filter(task => task.status === 'Complete').length > 0 ?
        <Carousel cols={2} rows={3} gap={10} loop className='carousel'>
          {userTasks.filter(task => task.status === 'Complete').map(task => (
            <Carousel.Item className='carousel-item' key={uuid()} >
              <TaskCard task={task} setTasks={setUserTasks} tasks={userTasks} deleteTask={deleteTask}/>
            </Carousel.Item>))}
        </Carousel> :
        <Header>You have not completed any tasks.</Header> }
        </Tab.Pane> }, 

    //Renders form to add a task
    { menuItem: '+Add New Task', render: () => (
      <Tab.Pane className='tab-pane'><NewTaskForm/></Tab.Pane> )}]

  return (
    <div className="main-screen wrapper">
      {spinner ? <div>Loading</div> :
       <Tab panes={myPanes} />}
    </div>
  )
}
  
export default MainTaskScreen