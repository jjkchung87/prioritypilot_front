import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import UserApi from '../api'
import { Header, Progress } from "semantic-ui-react"
import "./TeamMember.css"


const TeamMember = ({role, name, img, progress, lastUpdate}) => {

// Date string in the "mm-dd-yyyy" format
const dateString = lastUpdate;

// Convert the date string to a Date object
const dateParts = dateString.split('-');
const targetDate = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);

// Get today's date
const today = new Date();

// Calculate the time difference in milliseconds
const timeDifference = targetDate - today;

// Convert the time difference to the number of days
const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


return (
    <div className="TeamMember" style={{textAlign:"center"}}>
        <h4>{name}</h4>
        <div>{role}</div>
        <img className="TeamMember-img" src={img}></img>
        <div><b>Last status update:</b> {dateString} </div>
        <div><i>({daysDifference} days ago)</i></div>
        <span className="TeamMember-progress"><Progress fluid="true" percent={progress} progress /></span>

    </div>
    
)

}

export default TeamMember