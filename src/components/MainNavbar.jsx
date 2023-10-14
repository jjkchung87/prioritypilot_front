import { Header, Input, Button, Icon, Image } from 'semantic-ui-react'
import { Link, useNavigate  } from 'react-router-dom'
import NewProjectForm from './NewProjectForm'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function MainNavbar() {
  const { currentUser } = useContext(UserContext)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="main-navbar wrapper">
        <Header className='navbar-header'><Link to="/">Logo Priority Pilot</Link></Header>
        {currentUser ? 
        <div className='registered'>
          <Input className="search-input" action={{icon: 'search'}} placeholder="Search..."/>
          <Button content="+Add New Project" onClick={()=>setShowForm(true)}/>
          {/* <Icon name='bell' size="big"/> */}
          <h4>{currentUser.first_name} {currentUser.last_name}</h4>
          <Image src={currentUser.profile_img} size='tiny' circular />
        </div> : 
        <div className='not-registered'>
          <Link to="/register">Register</Link>
        </div> }
        {showForm && <NewProjectForm setShowForm={setShowForm}/>}
    </div>
  )
}

export default MainNavbar