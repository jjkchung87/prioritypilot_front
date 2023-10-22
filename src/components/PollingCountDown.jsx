import { Header } from "semantic-ui-react"
import { useEffect, useState, useRef, useContext } from "react";
import Modal from './Modal'
import { UserContext } from "../context/UserContext";

function PollingCountDown() {
  const {currentUser} = useContext(UserContext)
  const Ref = useRef(null);
  const [showPollModal, setShowPollModal] = useState(false);
 
  // The state for the timer
  const [timer, setTimer] = useState('00:00:00');
  // The Poll Modal State 

  useEffect(() => {
    if (timer === '23:03:12') {
      if (currentUser) {
        setShowPollModal(true)
      } else {
        setTimer('00:00:10')
      }
    }  
  }, [timer, currentUser])

  const getTimeRemaining = (e) => {
      const total = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / 1000 / 60 / 60) % 24);
      return {
          total, hours, minutes, seconds
      };
  }

  const startTimer = (e) => {
      let { total, hours, minutes, seconds } = getTimeRemaining(e);
      if (total >= 0) {
          setTimer(
              (hours > 9 ? hours : '0' + hours) + ':' +
              (minutes > 9 ? minutes : '0' + minutes) + ':'
              + (seconds > 9 ? seconds : '0' + seconds)
          )
      }
  }
  const clearTimer = (e) => {   
      setTimer('00:00:00');
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
          startTimer(e);
      }, 1000)
      Ref.current = id;
  }
  const getDeadTime = () => {
    let deadline;
    const currentDeadline = JSON.parse(localStorage.getItem('deadline'))
    if (currentDeadline) {
      deadline = currentDeadline
    } else {
      deadline = new Date();
      deadline.setHours(deadline.getHours() + 24);
      localStorage.setItem('deadline', JSON.stringify(deadline))
    }
    return deadline;
  }

  //starts the timer when component mounts
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  //timer will be reset when polling pop up is closed
  const resetTimer = () => {
    localStorage.removeItem('deadline')
    clearTimer(getDeadTime());
  }
  
  return (
    <>
      {showPollModal && <Modal closeModal={()=>setShowPollModal(false)} resetTimer={resetTimer}/>}
      <div className="countdown-table wrapper">
        <Header>AI - Polling Count Down</Header>
        <div className="time">
          {timer}
        </div>
      </div>
    </>
    
  )
}
  
export default PollingCountDown