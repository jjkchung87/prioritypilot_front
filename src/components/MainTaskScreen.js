import { Tab, Card } from 'semantic-ui-react'
import TaskCard from './TaskCard'

const samplePanes = [
    { menuItem: 'Today', render: () => <Tab.Pane className='tab-pane'>
        <Card.Group itemsPerRow={2}>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
        </Card.Group>
        </Tab.Pane> },
    { menuItem: 'This Week', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'All Tasks', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }, 
]
function MainTaskScreen() {
  return (
    <div className="main-screen wrapper">
      <Tab panes={samplePanes} />
    </div>
)
}
  
  export default MainTaskScreen