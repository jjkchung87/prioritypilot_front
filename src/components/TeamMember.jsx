import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import UserApi from '../api'
import { Header, Progress, Image, Modal } from "semantic-ui-react"
import "./TeamMember.css"
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root'); // Create a new div in your HTML with the id "modal-root"



const TeamMember = ({role, 
    firstName, 
    lastName, 
    img, 
    total_task_count, 
    not_started_task_count,
    in_progress_task_count,
    completed_task_count, 
    lastUpdate,
    manager_id}) => { 

    const { currentUser } = useContext(UserContext)
    const [nudged, setNudged] = useState(false)

    //Last Update calculations
    const targetDate = new Date(lastUpdate); //date object
    const today = new Date(); // date object
    const timeDifference = today - targetDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const formattedDate = new Date(lastUpdate).toLocaleDateString('en-US');
   
    //Progress calculation
    const progress = Math.floor(completed_task_count/total_task_count * 100)

    const notStartedProgress = total_task_count===0 ? '' : Math.floor(not_started_task_count/total_task_count*100)
    const inProgressProgress = total_task_count===0 ? '' : Math.floor(in_progress_task_count/total_task_count*100)
    const completedProgress = total_task_count===0 ? '' : Math.floor(completed_task_count/total_task_count*100)
    
    const handleNudge = ()=>{
      setNudged(true)
    }


return (
  <div className="TeamMember" style={{ textAlign: "left" }}>
    <img src={img} className="TeamMember-img" />
    <div className="TeamMember-info">
      <div><b>{firstName} {lastName}</b></div> 
      <div>{role}</div>
      <div className="progress-bar">
  <div className="completed-tasks" style={{ width: `${completedProgress}%`, textAlign:"center" }}>
    {total_task_count > 0 ? completed_task_count : ""}
  </div>
  <div className="in-progress-tasks" style={{ width: `${inProgressProgress}%`, textAlign:"center" }}>
  {total_task_count > 0 ? in_progress_task_count: ""}
  </div>
  <div className="not-started-tasks" style={{ width: `${notStartedProgress}%`, textAlign:"center" }}>
  {total_task_count > 0 ? not_started_task_count: ""}
  </div>
</div>
  <div className="last-update">
    {daysDifference > 7 ? (
      <>
      <span style={{ color: "red", fontSize:"10px" }}>
        <b>Last update:</b> {formattedDate}
      </span>
      { nudged ? (<div>nudged!</div>) : (<button onClick={handleNudge}>Nudge</button>)}
      </>
    ) : (
      <span style={{ fontSize:"10px"}}>
        <b>Last update:</b> {formattedDate} <i> ({daysDifference} days ago)</i>
      </span>
    )}
  </div>
</div>
</div>
);

}

export default TeamMember