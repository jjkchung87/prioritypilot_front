import { Form, Input, Button, Checkbox } from 'semantic-ui-react'
import './Forms.css'
import { useState } from 'react'

function RegistrationForm() {
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  }
  const [formData, setFormData] = useState(initialState)

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
       
        <Form.Group widths='equal'>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' required /> 
          </Form.Field>  
          <Form.Field>
            <p>Already a member? <a href="">Sign In </a>here.</p>
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