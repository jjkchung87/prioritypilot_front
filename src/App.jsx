import { useState } from 'react'
import { UserContext } from './context/UserContext'
import MainNavbar from './components/MainNavbar'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import UserPage from './components/UserPage'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <>
      <UserContext.Provider value={{ currentUser }}>
        <MainNavbar />
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/register' element={<RegistrationForm />} />
          <Route path='/user' element={<UserPage />} />
        </Routes> 
      </UserContext.Provider>
    </>
  )
}

export default App;
