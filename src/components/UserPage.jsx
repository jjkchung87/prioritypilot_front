import SideNavbar from './components/SideNavbar'
import ProjectDropdown from './components/ProjectDropdown'
import ProgressTable from './components/ProgressTable'
import PollingCountDown from './components/PollingCountDown'
import MainTaskScreen from './components/MainTaskScreen'

function UserPage() {
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