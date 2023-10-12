import {Button, Card, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function TaskCard({ card }) {
    return (
        <Card raised className='task-card'>
          <Card.Content>
            <div className='card-icons'>
              {card.status === "Not Started" && <Button size="tiny">Start Task</Button>}
              {(card.status === "Not Started" || card.status === "In progress") && <Button size="tiny">Mark as completed</Button>}
              {card.status !== "Completed" &&
              <Button size="tiny" icon><Icon name="edit"/></Button>}
              <Button size="tiny" icon><Icon name="delete"/></Button>
            </div>
            
            <Card.Meta>Priority: {card.priority.toUpperCase()}</Card.Meta>
            <Card.Meta>Deadline: {card.deadline.toString()}</Card.Meta>
            <div className='card-icons'>
              {card.status === "In progress" && <> <Icon name="clock green" className="in-progress-icon"/>In Progress </>}
              {card.status === "Completed" && <> <Icon name="check circle green" className='completed'/>Completed </>}
            </div>
            <Card.Header>{card.title}</Card.Header>
            <Card.Description>{card.description}</Card.Description>
            <Card.Meta></Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Link>Al Recomendations </Link> <span>Date created: {card.date_created.toString()}</span>
          </Card.Content>
        </Card>
    )
  }
  
  export default TaskCard