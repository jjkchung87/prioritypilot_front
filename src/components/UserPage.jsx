import SideNavbar from './SideNavbar'
import ProjectDropdown from './ProjectDropdown'
import ProgressTable from './ProgressTable'
import PollingCountDown from './PollingCountDown'
import MainTaskScreen from './MainTaskScreen'

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