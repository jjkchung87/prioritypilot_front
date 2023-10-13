import { useState } from "react";
import { Form, Icon, Button } from "semantic-ui-react";
import DatePicker from 'react-datepicker'

function EditTaskForm({ task, setShowForm }) {
    const initialState = {
      project: task.project,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority
    }
  
    const [formData, setFormData] = useState(initialState)
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
  
   const saveUpdates = (e) => {
     console.log(formData)
     setFormData(initialState)
   }
   return (
    <div className="edit-task">
      <Form onSubmit={saveUpdates} className='edit-task-form'>
        <Button className='close-project-form' icon 
                onClick={()=>setShowForm(false)} size="tiny">
          <Icon name="close"></Icon>
        </Button>
        <h3>Edit Task</h3>
        <h4>{task.project}</h4>
        <Form.Field>
          <label>Task Title</label>
          <input required placeholder="Title" name='title' value={formData.title} onChange={handleInputChange}/>  
        </Form.Field>
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
        <Button fluid type='submit'>Save Updates</Button>
      </Form >
    </div>
    )
  }
  
  export default EditTaskForm