import { Form, Input, Button, Header } from 'semantic-ui-react'
import './Forms.css'
import { useState } from 'react'

function LoginForm() {
  const initialState = {
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
    <div className="login">
      <div className='image-logo'>
        Some Image
      </div>
      <Form>
        <Header className='form-header'>Welcome Back</Header>
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
        <Form.Field>
        <p>Don't have an account? <a href="">Register </a>here.</p>
        </Form.Field>
        <Form.Field
          fluid 
          size='large'
          id='form-button-control-public'
          control={Button}
          content='Sign In'/>
      </Form>
    </div>
  )
}

export default LoginForm