import { Form, Input, Button, Icon } from 'semantic-ui-react'
import './Forms.css'
import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import DatePicker from 'react-datepicker'
import UserApi from '../api'
import 'react-datepicker/dist/react-datepicker.css'
import { ProjectContext } from '../context/ProjectContext'


function NewProjectForm({ setShowForm }) {
  const past = (date) => new Date() < date;

  const initialState = {
    project_name: "",
    end_date: "",
    description: "",
    ai_recommendation: false
  }
  const { currentUser } = useContext(UserContext)
  const { setCurrentProject } = useContext(ProjectContext)

  const [formData, setFormData] = useState(initialState)
  const handleInputChange = (e) => {
    let value;
    let name;
  //saving data for date picker
    if (!e.target) {
      value = e
      name = 'end_date'
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
  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = {...formData, user_id: currentUser.id}
    try {
      await UserApi.addProject(data);
      setShowForm(false)
      setCurrentProject(formData.project_name)
      return { success: true };
    } catch (errors) {
      console.error("Error adding project. Try again later", errors);
      return { success: false, errors };
    }
    
  }

  return (
    <div className="add_project">
      <Form className='project-form' onSubmit={handleSubmit}>
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
            value={formData.project_name}
            onChange={handleInputChange}
            name="project_name"/>
        <Form.Field required>
          <label>Deadline:</label>
          <DatePicker showTimeSelect="true" placeholderText="Click to select a date" name='end_date' filterDate={past} value={formData.end_date} selected={formData.end_date} onChange={handleInputChange} /> 
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