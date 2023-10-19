import SideNavbar from './SideNavbar'
import ProjectDropdown from './ProjectDropdown'
import ProgressTable from './ProgressTable'
import PollingCountDown from './PollingCountDown'
import MainTaskScreen from './MainTaskScreen'
import Modal from './Modal'; // Import a modal component
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function UserPage({ logout }) {
  const { currentUser } = useContext(UserContext)
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    if (!currentUser) navigate('/')
  })
  
  return (
    <div className="user-page">
       <SideNavbar logout={logout}/>
        <div className='project-table'>
          <ProjectDropdown />
          <div className='status-tables'>
            <ProgressTable />
            <PollingCountDown />
          </div>
          <MainTaskScreen />
        </div>
        {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
        </Modal>
      )}
    </div>  
  )
}

export default UserPage