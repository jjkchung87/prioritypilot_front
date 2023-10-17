import { Form,Button, Header } from 'semantic-ui-react'
import { useContext, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { UserContext } from '../context/UserContext'
import { ProjectContext } from '../context/ProjectContext'
import UserApi from '../api'


function NewTaskForm() {
  const initialState = {
    project: '',
    title: '',
    description: '',
    deadline: '',
    priority: 'Low'
  }
  const { currentUser } = useContext(UserContext)
  const { currentProject, setCurrentProject } = useContext(ProjectContext)

  const [formData, setFormData] = useState(initialState)
  const [saved, setSaved] = useState(false)
  const past = (date) => new Date() < date;

  const handleInputChange = (e) => {
    //saving data for date picker
    if (!e.target) {
      setFormData(data => ({
        ...formData, 
        deadline: e
      }))
    } else {
      const { name, value } = e.target
      setFormData(data => ({
        ...formData, 
        [name]: value
      })) 
      if (name === "project") setCurrentProject(formData.project)
    }

 }

 const saveNewTask = async(e) => {
   e.preventDefault()
   let chosenProject = currentUser.projects.filter(p => p.project_name === formData.project)
   let projectId = chosenProject[0].id
   let data = {...formData, user_id: currentUser.id}
   await UserApi.addTask(data, projectId)
   setFormData(initialState)
   setSaved(true)
 }
 return (
    <>
    {!saved ?
    <Form onSubmit={saveNewTask} className='add-new-task'>
      <h3>Add New Task</h3>
      <Form.Group widths={'equal'}>
        <Form.Field>
          <label>Project Title</label>
          <select onChange={handleInputChange} name="project">
            <option value={currentProject}>{currentProject}</option>
            {currentUser.projects.filter(p => p.project_name !== currentProject).map((p) => (
                <option key={p.id} value={p.project_name}>
                  {p.project_name}
                </option>
            ))}
          </select> 
        </Form.Field>
        <Form.Field>
          <label>Task Title</label>
          <input required placeholder="Title" name='title' value={formData.title} onChange={handleInputChange}/>  
        </Form.Field>
      </Form.Group>
      <Form.Group inline >
        <label>Priority: </label>
        <Form.Field>
        Low <input name='priority' type="radio" value="Low" checked={formData.priority === 'Low'} onChange={handleInputChange}/>
        </Form.Field>
        <Form.Field>
        Medium <input name='priority' type="radio" value="Medium" checked={formData.priority === 'Medium'} onChange={handleInputChange}/>
        </Form.Field>
        <Form.Field>
        High <input name='priority' type="radio" value="High" checked={formData.priority === 'High'} onChange={handleInputChange}/>
        </Form.Field>
         
        <label>Deadline:</label>
        <DatePicker name='deadline' showTimeSelect filterDate={past} value={formData.deadline} selected={formData.deadline} onChange={handleInputChange} /> 
      </Form.Group>
      <Form.TextArea required label='Description' name="description" placeholder='Your task...' onChange={handleInputChange} value={formData.description}/>
      <Button fluid type='submit'>Save Task</Button>
    </Form >
    : <Form><Header>You've added a New Task</Header></Form> 
    }</>
)
}

export default NewTaskForm