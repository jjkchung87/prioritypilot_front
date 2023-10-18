import {Button, Card, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import EditTaskForm from './EditTaskForm'
import UserApi from '../api'

function TaskCard({ task, setTasks, tasks }) {
  const [ showEditTask, setShowEditTask ] = useState(false)
  const [ currentStatus, setCurrentStatus ] = useState(task.status)


  const updateStatus = async (status, id = task.id) => {
    let taskWithNewStatus = {...task, status: status}
    let result = await UserApi.editTask(taskWithNewStatus, task.project_id, task.id)
    let list = tasks.map(item => { if(item.id === id){item.status=status}return item})
    setTasks(list)
  }
  const addUpdates = async (data) => {
    let result = await UserApi.editTask(data, task.project_id, task.id)
    let list = tasks.map(item => { if(item.id === task.id){item = data}return item})
    setTasks(list)
  }
    return (
      <>{showEditTask && <EditTaskForm task={task} addUpdates={addUpdates} setShowForm={setShowEditTask} tasks={tasks}/>}
        <Card raised className='task-card'>
          <Card.Content>
            <div className='card-icons'>
              {currentStatus === "Not Started" && <Button size="tiny" onClick={()=>updateStatus('In Progress')}>Start Task</Button>}
              {(currentStatus === "Not Started" || currentStatus === "In Progress") && <Button size="tiny" onClick={()=>updateStatus('Complete')}>Complete Task</Button>}
              {currentStatus !== "Complete" &&
              <Button size="tiny" icon onClick={()=>setShowEditTask(true)}><Icon name="edit"/></Button>}
              <Button size="tiny" icon><Icon name="delete"/></Button>
            </div>
            <Card.Header className='task-name'>{task.task_name}</Card.Header>
            <Card.Meta>Priority: {task.priority.toUpperCase()}</Card.Meta>
            <Card.Meta>Deadline: {task.end_date.toString()}</Card.Meta>
            <div className='card-icons'>
              {currentStatus === "In Progress" && <> <Icon name="clock" color='green' className="in-progress-icon"/>In Progress </>}
              {currentStatus === "Complete" && <> <Icon name="check circle" color='green' className='completed'/>Completed </>}
            </div>
            
            <Card.Description>{task.description}</Card.Description>
           
            <Card.Meta></Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Link>Al Recomendations </Link> <span className='created-at'>Date created: {task.created_at}</span>
          </Card.Content>
        </Card>
       </>  
    )
   
  }
  
  export default TaskCard