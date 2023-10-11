
import { Dropdown } from "semantic-ui-react"


const projects = [
  {key: 'Project 1',
  text: 'Project 1',
value: 'Project 1',
className: 'p1'},
  {key: 'Project 2',
  text: 'Project 2',
value: 'Project 2'},
  {key: 'Project 3',
  text: 'Project 3',
value: 'Project 3',}
]
function ProjectDropdown() {
  
  return (
    <div className="dropdown wrapper">
      <Dropdown
        placeholder='Select Project'
        fluid
        search
        selection
        options={projects}
      />
    </div>
    )
  }
  
  export default ProjectDropdown