import { Tab, Card, Form, Header, Dropdown, Input } from 'semantic-ui-react'
import TaskCard from './TaskCard'
import NewTaskForm from './NewTaskForm'
import { useState } from 'react'

const myPanes = [
    { menuItem: 'All Tasks', render: () => <Tab.Pane className='tab-pane'>
        <Card.Group itemsPerRow={2}>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
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