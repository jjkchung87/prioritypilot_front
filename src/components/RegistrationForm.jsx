import { Form, Input, Button, Checkbox } from 'semantic-ui-react'
import './Forms.css'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'


function RegistrationForm() {
  const navigate = useNavigate()
  const initialState = {
    first_name: "",
    last_name: "",
    team: "",
    role: "",
    email: "",
    password: "",
    confirm_password: ""
  }
  const { currentUser } = useContext(UserContext)
  const [formData, setFormData] = useState(initialState)
  
  if (currentUser) navigate('/user')
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(data => ({
      ...formData, 
      [name]: value
    }))
  }
  return (
    <div className="register">
      <Form>
        <p>{formData.first_name}</p>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-first-name'
            control={Input}
            label='First name'
            placeholder='First name'
            value={formData.first_name}
            onChange={handleInputChange}
            name="first_name"/>
          <Form.Field
            id='form-input-control-last-name'
            control={Input}
            label='Last name'
            placeholder='Last name'
            value={formData.last_name}
            onChange={handleInputChange}
            name="last_name"/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-team'
            control={Input}
            label='Team'
            placeholder='Your Department'
            value={formData.team}
            onChange={handleInputChange}
            name="team"/>
          <Form.Field
            id='form-input-control-role'
            control={Input}
            label='Role'
            placeholder='Role'
            value={formData.role}
            onChange={handleInputChange}
            name="role"/>
        </Form.Group>
        <Form.Field
          id='form-input-control-error-email'
          control={Input}
          label='Email'
          value={formData.email}
          onChange={handleInputChange}
          placeholder='joe@schmoe.com'
          name='email'
          // error={{
          //   content: 'Please enter a valid email address',
          //   pointing: 'below',
          // }}
          />
        <Form.Field
          id='form-input-control-last-name'
          control={Input}
          label='Create Password'
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder='Password'/>
        <Form.Field
          id='form-input-control-last-name'
          control={Input}
          label='Confirm Password'
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleInputChange}
          placeholder='Enter Password Again..'/>
       
        <Form.Group widths='equal'>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' required /> 
          </Form.Field>  
          <Form.Field>
            <p>Already a member? <Link to="/">Sign in </Link>here.</p>
          </Form.Field>
        </Form.Group>
         <Form.Field
          fluid 
          size='large'
          id='form-button-control-public'
          control={Button}
          content='Register'/>
      </Form>
    </div>
  )
}

export default RegistrationForm