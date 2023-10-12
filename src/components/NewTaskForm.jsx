import { Form,Button, Header } from 'semantic-ui-react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const projects = ['project1', 'project2', 'project3', 'Custom Tasks']

function NewTaskForm({ setFormActive }) {
  const initialState = {
    project: 'Custom Tasks',
    title: '',
    description: '',
    deadline: '',
    priority: 'low'
  }

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
    }
 }

 const saveNewTask = (e) => {
   console.log(formData)
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
            {projects.map((project) => (
                <option key={project}>
                  {project}
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
        Low <input name='priority' type="radio" value="low" checked={formData.priority === 'low'} onChange={handleInputChange}/>
        </Form.Field>
        <Form.Field>
        Medium <input name='priority' type="radio" value="medium" checked={formData.priority === 'medium'} onChange={handleInputChange}/>
        </Form.Field>
        <Form.Field>
        High <input name='priority' type="radio" value="high" checked={formData.priority === 'high'} onChange={handleInputChange}/>
        </Form.Field>
         
        <label>Deadline:</label>
        <DatePicker name='deadline' filterDate={past} value={formData.deadline} selected={formData.deadline} onChange={handleInputChange} /> 
      </Form.Group>
      <Form.TextArea required label='Description' name="description" placeholder='Your task...' onChange={handleInputChange} value={formData.description}/>
      <Button fluid type='submit'>Save Task</Button>
    </Form >
    : <Form><Header>You've added a New Task</Header></Form> 
    }</>
)
}

export default NewTaskForm