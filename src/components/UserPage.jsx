import SideNavbar from './SideNavbar'
import ProjectDropdown from './ProjectDropdown'
import ProgressTable from './ProgressTable'
import PollingCountDown from './PollingCountDown'
import MainTaskScreen from './MainTaskScreen'
import { useContext, useEffect} from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function UserPage({ logout }) {
  const { currentUser } = useContext(UserContext)

  const navigate = useNavigate()
  useEffect(() => {
    if (!currentUser) navigate('/')
  })
  
  return (
    <div className="user-page">
      <SideNavbar />
      <div className='project-table'>
        <ProjectDropdown />
        <div className='status-tables'>
          <ProgressTable />
          <PollingCountDown />
        </div>
        <MainTaskScreen />
      </div>
    </div>  
  )
}

export default UserPage