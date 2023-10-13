import { Tab, Card, Form, Header, Dropdown, Input } from 'semantic-ui-react'
import TaskCard from './TaskCard'
import NewTaskForm from './NewTaskForm'
import { useState } from 'react'

const Task1 = {
  project: "Test Project",
  title: "Task 1",
  description: "This is task 1",
  date_created: new Date(),
  priority: 'low',
  deadline: new Date(),
  status: 'In progress'
}
const Task2 = {
  project: "My Project",
  title: "Task 2",
  description: "This is task 2",
  date_created: new Date(),
  priority: 'medium',
  deadline: new Date(),
  status: 'Not started'
}
const Task3 = {
  project: "Project 3",
  title: "Task 3",
  description: "This is task 3",
  date_created: new Date(),
  priority: 'high',
  deadline: new Date(),
  status: 'Completed'
}
const Task4 = {
  project: "Project 4",
  title: "Task 4",
  description: "This is task 4",
  date_created: new Date(),
  priority: 'high',
  deadline: new Date(),
  status: 'Not started'
}

const myPanes = [
    { menuItem: 'All Tasks', render: () => <Tab.Pane className='tab-pane'>
        <Card.Group itemsPerRow={2}>
            <TaskCard card={Task1}/>
            <TaskCard card={Task2}/>
            <TaskCard card={Task3}/>
            <TaskCard card={Task4}/>
        </Card.Group>
        </Tab.Pane> },
    { menuItem: 'Today', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'This Week', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }, 
    { menuItem: 'Completed Tasks', render: () => <Tab.Pane>Completed Tasks</Tab.Pane> }, 
    { menuItem: '+Add New Task', render: () => (
      <Tab.Pane><NewTaskForm/></Tab.Pane> )}]
  
function MainTaskScreen() {

  return (
    <div className="main-screen wrapper">
      <Tab panes={myPanes} />
    </div>
  )
}
  
  export default MainTaskScreen