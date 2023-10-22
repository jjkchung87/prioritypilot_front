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
    lastUpdate}) => {

   
  

    //Last Update calculations
    const targetDate = new Date(lastUpdate); //date object
    const today = new Date(); // date object
    const timeDifference = today - targetDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const formattedDate = new Date(lastUpdate).toLocaleDateString();
   
    //Progress calculation
    const progress = completed_task_count/total_task_count * 100

// Modal functions
//     const [additionalDetails, setAdditionalDetails] = useState(""); // Initialize with an empty string
//     const [isModalVisible, setModalVisible] = useState(false);
//     const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

//       // Function to show additional details in the modal
//     const handleShowDetails = (e) => {
//     // Calculate the position of the modal based on the event's coordinates
//     const top = e.clientY;
//     const left = e.clientX;

//     // Set the modal position
//     setModalPosition({ top, left });

//     // Show the modal
//     setModalVisible(true);
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setModalVisible(false);
//   };




return (
    <div className="TeamMember" 
    style={{textAlign:"center"}} 
    // onMouseEnter={handleShowDetails}
    // onMouseLeave={handleCloseModal}
>   
    <div><b>{firstName} {lastName}</b></div>
    <div>{role}</div>
    <img src={img} className="TeamMember-img"/>
    {daysDifference > 7 ? <div style={{color: 'red'}}><b>Last status update:</b> {formattedDate} </div> : <div><b>Last status update:</b> {formattedDate} </div>}
    
    <div><i>({daysDifference} days ago)</i></div>
    <span className="TeamMember-progress"><Progress fluid="true" percent={progress} progress /></span>

    {/* Still need to work on pop-up modal when user hovers over teammember card */}
    {/* {isModalVisible &&
        ReactDOM.createPortal(
          <Modal
            open={isModalVisible}
            onClose={handleCloseModal}
            style={{
              position: 'fixed',
              top: modalPosition.top,
              left: modalPosition.left,
              transform: 'translate(-50%, -50%)', // Adjust modal position
            }}
          >
            <Modal.Header>Additional Details</Modal.Header>
            <Modal.Content>
              {additionalDetails}
            </Modal.Content>
          </Modal>,
          modalRoot
        )} */}
    </div>
    
)

}

export default TeamMember