import {Button, Card, Icon} from 'semantic-ui-react'

function TaskCard() {
    return (
        <Card raised className='task-card'>
          <Card.Content>
            <div className='card-icons'>
              <Button icon><Icon name="edit"/></Button>
              <Button icon><Icon name="delete"/></Button>
            </div>
            <Card.Meta>Priority</Card.Meta>
            <Card.Meta>Deadline</Card.Meta>
            <Card.Header>Some Task</Card.Header>
            <Card.Description>Task Description</Card.Description>
            <Card.Meta></Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a>Al Recomendations</a> <span>Date created</span>
          </Card.Content>
        </Card>
    )
  }
  
  export default TaskCard