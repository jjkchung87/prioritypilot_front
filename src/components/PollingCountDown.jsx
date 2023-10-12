import { Header } from "semantic-ui-react"
import { useEffect, useState } from "react";

function PollingCountDown() {
  const deadline = 'November, 2, 2023'
  // const [days, setDays] = useState(0);
  // const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  const getTime = () => {
    const time = Date.parse(deadline) - Date.now()
    setMinutes(Math.floor((time/1000/60)%60))
    setSeconds(Math.floor((time/1000)%60))
    console.log(time)
  }

  // useEffect(() => {
  //   const interval = setInterval(() => getTime(deadline), 1000)
  //   return () => clearInterval(interval)
  // }, [])
    return (
      <div className="countdown-table wrapper">
        <Header>AI - Polling Count Down</Header>
        <div className="time">
          <span>{minutes} : </span><span>{seconds}</span>
        </div>
      </div>
    )
  }
  
  export default PollingCountDown