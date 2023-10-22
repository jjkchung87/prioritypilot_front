import {Header} from 'semantic-ui-react';
import { useState, useContext, useEffect} from 'react'
import TeamMember from './TeamMember';
import { UserContext } from '../context/UserContext'
import { ProjectContext } from '../context/ProjectContext'
import UserApi from '../api'

function SideNavbar({ logout }) {
  const { currentUser } = useContext(UserContext)
  const { currentProject } = useContext(ProjectContext)

  const [teamView, setTeamView] = useState("Project Team")
  const [teamMemberCards, setTeamMemberCards] = useState([])

  useEffect(function fetchUsersWhenMounted() {
    async function fetchUsers() {
      let users = null;
      try{
          if(teamView === 'Project Team'){
          let res = await UserApi.getUsersByProject(currentProject.id)
          console.log(res)
          users = res.data.users
          } else {
            let res = await UserApi.getSubs(currentUser.id)
            console.log(res)
            users = res.data.users
          }
          setTeamMemberCards(users.filter(u => u.id !== currentUser.id))

        } catch (error){
          console.error('Error fetching team users:', error)
      } 
    }
    fetchUsers()
  }
  ,[teamView, currentProject])
  

  const handleTeamViewChange = (e) => {
    setTeamView(e.target.value)
    console.log(teamView)
  }


  return (
    <div className="wrapper sidebar" >
      <div className="team-members" style={{textAlign:"center"}}>
      <select className="select-project" value={teamView} onChange={handleTeamViewChange}>
        <option value="Project Team">Project Team</option>
        <option value="Your Team">Your Team</option>
      </select>
      <div className="SideNavbar-TeamCards">
        {teamMemberCards.map(member => (
          <TeamMember firstName={member.first_name}
          lastName={member.last_name}
          img={member.profile_img}
          total_task_count={member.total_task_count}
          not_started_task_count={member.not_started_task_count}
          in_progress_task_count={member.in_progress_task_count}
          completed_task_count={member.completed_task_count}
          role={member.role}
          lastUpdate={member.latest_update} />
        ))}
      </div>
      
      </div>
    </div>
  )
  }
  export default SideNavbar