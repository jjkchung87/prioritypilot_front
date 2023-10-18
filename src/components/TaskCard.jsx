import {Button, Card, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import EditTaskForm from './EditTaskForm'
import UserApi from '../api'

function TaskCard({ task, setTasks }) {
  const [ showEditTask, setShowEditTask ] = useState(false)
  const [ currentTask, setCurrentTask ] = useState(
    {title: task.task_name,
     description: task.description,
     status: task.status,
     priority: task.priority,
     deadline: task.end_date,
     user_id: task.user_id
   })
  const startTask = async (e) => {
    setCurrentTask(currentTask => ({
      ...currentTask, 
      status: "In Progress"
    }))
    setTasks(tasks => [...tasks, {...task, status: "In Progress"}])
    let result = await UserApi.editTask({...currentTask, status: "In Progress"}, task.project_id, task.user_id)
    console.log(result)
  }
  const completeTask = async (e) => {
    setCurrentTask(currentTask => ({
      ...currentTask, 
      status: "Complete"
    }))
    let result = await UserApi.editTask({...currentTask, status: "Complete"}, task.project_id, task.user_id)
    setCurrentTask(result.task)
  }
    return (
      <>{showEditTask && <EditTaskForm task={task} setTasks={setTasks} setShowForm={setShowEditTask}/>}
        <Card raised className='task-card'>
          <Card.Content>
            <div className='card-icons'>
            {/* <select>
                <option key='not_started' value={card.status}>Not Started</option>
                <option key='in_progress' value={card.status}>In Progress</option>
                <option key='complete' value={card.status}>Completed</option>
            </select>  */}
              {currentTask.status === "Not Started" && <Button size="tiny" onClick={startTask}>Start Task</Button>}
              {(currentTask.status === "Not Started" || currentTask.status === "In Progress") && <Button size="tiny" onClick={completeTask}>Complete Task</Button>}
              {currentTask.status !== "Complete" &&
              <Button size="tiny" icon onClick={()=>setShowEditTask(true)}><Icon name="edit"/></Button>}
              <Button size="tiny" icon><Icon name="delete"/></Button>
            </div>
            
            <Card.Meta>Priority: {currentTask.priority.toUpperCase()}</Card.Meta>
            <Card.Meta>Deadline: {task.end_date}</Card.Meta>
            <div className='card-icons'>
              {currentTask.status === "In Progress" && <> <Icon name="clock" color='green' className="in-progress-icon"/>In Progress </>}
              {currentTask.status === "Complete" && <> <Icon name="check circle" color='green' className='completed'/>Completed </>}
            </div>
            <Card.Header>{currentTask.task_name}</Card.Header>
            <Card.Description>{currentTask.description}</Card.Description>
            <Card.Description>{currentTask.project_id}</Card.Description>
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