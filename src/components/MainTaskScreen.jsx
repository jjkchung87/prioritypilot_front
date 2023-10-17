import { Tab, Card, Form, Header, Dropdown, Input } from 'semantic-ui-react'
import TaskCard from './TaskCard'
import NewTaskForm from './NewTaskForm'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'

function MainTaskScreen() {
  const { currentUser } = useContext(UserContext)
  let allTasks = [];
  let completedTasks = []
  if (currentUser) {
    for (let project of currentUser.projects) {
      for (let task of project.tasks) {
        if (task.status !== 'Completed') {
          allTasks.push(task)
        } else {
          completedTasks.push(task)
        }
      }
    }
  }
  const [userTasks, setUserTasks] = useState(allTasks)
  
  console.log(currentUser)
  console.log(allTasks)
  console.log(completedTasks)
  
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
      { completedTasks.length > 0 ?
      <Card.Group itemsPerRow={2}>
        {completedTasks.map(task => <TaskCard key={task.id} task={task}/>)}
      </Card.Group> :
      <Header>You have not completed any tasks.</Header> }
      </Tab.Pane> }, 
    { menuItem: '+Add New Task', render: () => (
      <Tab.Pane><NewTaskForm/></Tab.Pane> )}]
  return (
    <div className="main-screen wrapper">
      <Tab panes={myPanes} />
    </div>
  )
}
  
  export default MainTaskScreen