import { Form, Input, Button, Icon } from 'semantic-ui-react'
import './Forms.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


function NewProjectForm({ setShowForm }) {
  const navigate = useNavigate()
  const past = (date) => new Date() < date;

  const initialState = {
    title: "",
    deadline: "",
    description: "",
    ai_recommendation: false
  }
  const { currentUser } = useContext(UserContext)
  const [formData, setFormData] = useState(initialState)

  console.log(formData)
  const handleInputChange = (e) => {
    let value;
    let name;
  //saving data for date picker
    if (!e.target) {
      value = e
      name = 'deadline'
  //saving checkbox update
    } else if (e.target.type === 'checkbox') {
      value = e.target.checked
      name = e.target.name
    } else {
      value = e.target.value
      name = e.target.name
    }
    setFormData(data => ({
      ...formData, 
      [name]: value
    })) 
  }

  return (
    <div className="add_project">
      <Form className='project-form'>
        <Button className='close-project-form' icon 
                onClick={()=>setShowForm(false)}
                size="tiny">
          <Icon name="close"></Icon>
        </Button>
        <h1>Add New Project</h1>
        <Form.Field
            required
            id='form-input-control-project-title'
            control={Input}
            label='Title'
            placeholder='Project Title'
            value={formData.title}
            onChange={handleInputChange}
            name="title"/>
        <Form.Field required>
          <label>Deadline:</label>
          <DatePicker  name='deadline' filterDate={past} value={!formData.deadline} selected={formData.deadline} onChange={handleInputChange} /> 
        </Form.Field>
        <Form.Field>
          <Form.TextArea required label='Description' name="description" placeholder='Add description...' onChange={handleInputChange} value={formData.description}/>
        </Form.Field>
        <Form.Field className='ai-checkbox-field'>
          <input name="ai_recommendation" type='checkbox' checked={formData.ai_recommendation} onChange={handleInputChange}/> <label>Create Project with AI</label>   
        </Form.Field>
        
        <Form.Field
          fluid 
          size='large'
          id='form-button-control-public'
          control={Button}
          content='Create Project'/>
      </Form>
    </div>
  )
}

export default NewProjectForm