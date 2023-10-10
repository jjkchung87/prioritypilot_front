import { Header, Input, Button, Icon, Image } from 'semantic-ui-react'

function MainNavbar() {
  const loggedIn = 
      <div className='registered'>
          <Input className="search-input" action={{icon: 'search'}} placeholder="Search..."/>
          <Button content="Add New Project" />
          <Icon name='bell' />
          <Image src='https://thumbs.dreamstime.com/b/funny-face-baby-27701492.jpg' size='tiny' circular />
      </div>
  const notLoggedIn =  
      <div className='notRegistered'>
        <Button content="Sign In" />
        <Button content="Sign Up" />
      </div>

  return (
    <div className="main-navbar wrapper">
        <Header className='navbar-header'>Logo Priority Pilot</Header>
        {true ? loggedIn : notLoggedIn }
    </div>
  )
}

export default MainNavbar