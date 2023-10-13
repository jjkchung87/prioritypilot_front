import {Button, Card, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import EditTaskForm from './EditTaskForm'

function TaskCard({ card }) {
  const [ showEditTask, setShowEditTask ] = useState(false)
    return (
      <>{showEditTask && <EditTaskForm task={card} setShowForm={setShowEditTask}/>}
        <Card raised className='task-card'>
          <Card.Content>
            <div className='card-icons'>
            {/* <select>
                <option key='not_started' value={card.status}>Not Started</option>
                <option key='in_progress' value={card.status}>In Progress</option>
                <option key='complete' value={card.status}>Completed</option>
            </select>  */}
              {card.status === "Not started" && <Button size="tiny">Start Task</Button>}
              {(card.status === "Not started" || card.status === "In progress") && <Button size="tiny">Complete Task</Button>}
              {card.status !== "Completed" &&
              <Button size="tiny" icon onClick={()=>setShowEditTask(true)}><Icon name="edit"/></Button>}
              <Button size="tiny" icon><Icon name="delete"/></Button>
            </div>
            
            <Card.Meta>Priority: {card.priority.toUpperCase()}</Card.Meta>
            <Card.Meta>Deadline: {card.deadline.toString()}</Card.Meta>
            <div className='card-icons'>
              {card.status === "In progress" && <> <Icon name="clock" color='green' className="in-progress-icon"/>In Progress </>}
              {card.status === "Completed" && <> <Icon name="check circle" color='green' className='completed'/>Completed </>}
            </div>
            <Card.Header>{card.title}</Card.Header>
            <Card.Description>{card.description}</Card.Description>
            <Card.Meta></Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Link>Al Recomendations </Link> <span>Date created: {card.date_created.toString()}</span>
          </Card.Content>
        </Card>
       </>  
    )
   
  }
  
  export default TaskCard