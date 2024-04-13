/* eslint-disable react/prop-types */
import { useEffect } from "react"

function Timer({ dispatch, secondsRemaining }) {
  let mins = Math.floor(secondsRemaining / 60)
  let seconds = secondsRemaining % 60

  useEffect(function () { 
    
      const id = setInterval(function () {
        dispatch({type: "tick"})
      }, 1000)
    return ()=> clearInterval(id)

  }, [dispatch])

  return (
    <p  className="timer">
     { String(mins).padStart(2,0)}: {String(seconds).padStart(2,0)}
    </p>
  )
}

export default Timer
