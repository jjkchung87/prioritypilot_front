import { Header, Input, Button, Icon, Image } from 'semantic-ui-react'
import { Link  } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function MainNavbar() {
  const { currentUser } = useContext(UserContext)

  //jsx for logged in users
  const loggedIn = 
      <div className='registered'>
          <Input className="search-input" action={{icon: 'search'}} placeholder="Search..."/>
          <Button content="+Add New Project" />
          <Icon name='bell' size="big"/>
          <Image src='https://thumbs.dreamstime.com/b/funny-face-baby-27701492.jpg' size='tiny' circular />
      </div>
  //jsx for not logged in users
  const notLoggedIn =  
      <div className='not-registered'>
        <Link to="/register">Register</Link>
      </div>

  return (
    <div className="main-navbar wrapper">
        <Header className='navbar-header'><Link to="/">Logo Priority Pilot</Link></Header>
        {!currentUser ? loggedIn : notLoggedIn }
    </div>
  )
}

export default MainNavbar