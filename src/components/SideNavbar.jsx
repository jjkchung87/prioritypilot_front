import {Header} from 'semantic-ui-react';
import TeamMember from './TeamMember';

function SideNavbar({ logout }) {
    return (
      <div className="wrapper sidebar" >
        <div className="team-members" style={{textAlign:"center"}}>
          <Header>Your Team</Header>
          <hr />
          <TeamMember name="Michelle Wesley" 
                      img="https://media.istockphoto.com/id/1394347360/photo/confident-young-black-businesswoman-standing-at-a-window-in-an-office-alone.jpg?s=612x612&w=0&k=20&c=tOFptpFTIaBZ8LjQ1NiPrjKXku9AtERuWHOElfBMBvY=" 
                      progress="75"
                      role="Assistant Product Manager"
                      lastUpdate={"10-18-2023"} />
          <hr/>
          <TeamMember name="Bailey Smith" 
                      img="https://media.istockphoto.com/id/1279504799/photo/businesswomans-portrait.jpg?s=612x612&w=0&k=20&c=I-54ajKgmxkY8s5-myHZDv_pcSCveaoopf1DH3arv0k=" 
                      progress="15"
                      role="Coordinator"
                      lastUpdate={"10-31-2023"}/>
          <hr/>
          <TeamMember name="Matt Bissonnette" 
                      img="https://media.istockphoto.com/id/1016761216/photo/portrait-concept.jpg?s=612x612&w=0&k=20&c=JsGhLiCeBZs7NeUY_3wjDlLfVkgDJcD9UCXeWobe7Ak=" 
                      progress="85"
                      role="Analyst"
                      lastUpdate={"10-25-2023"}/>
          <hr />
        </div>
      </div>
    )
  }
  export default SideNavbar