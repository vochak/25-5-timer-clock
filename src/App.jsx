   import React, { useState, useEffect } from 'react';

function App() {
  const [breakCount, setBreakCount] = useState(5);
  const [sessionCount, setSessionCount] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timeState, setTimeState] = useState(false);
  let timerInterval; // To store the interval ID
  let timer = false

//
function getT(t) {
timer = true
    t = t*60
  const minutes = Math.floor(t / 60);
  const seconds = t % 60;
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}


//
if (timeLeft === 0){
  function updateDisplay() {
    breakCount(prevTime => prevTime - 1);
  }
  useEffect(() => {
    let timerI
    if ( timeLeft === 0) {
      // Start the timer
      timerI = setInterval(updateDisplay, 1000);
    } else {
      // Clear the interval (pause the timer)
      clearInterval(timerI);
    }
    
  
    // Clean up by removing the interval when the component unmounts
    return () => {
      clearInterval(timerI);
    };
  }, [])


}


//
  
  useEffect(() => {
    if (timeState && timeLeft > 0) {
      // Start the timer
      timerInterval = setInterval(updateDisplay, 1000);
    } else {
      // Clear the interval (pause the timer)
      clearInterval(timerInterval);
    }
    
  
    // Clean up by removing the interval when the component unmounts
    return () => {
      clearInterval(timerInterval);
    };
  }, [timeState, timeLeft])

  

  function sessionIncrement() {
    if (sessionCount <= 3600-60){
    setSessionCount(s => s + 60);
    setTimeLeft(t => t + 60);}
  }

  function startStop() {
    
    setTimeState(prevState => !prevState); // Toggle timeState
    
  }

  function updateDisplay() {
    setTimeLeft(prevTime => prevTime - 1);
  }

  function sessionDecrement() {
    if (sessionCount>=120){
    setSessionCount(s => s - 60);
    setTimeLeft(t => t - 60);}
  }

  function breakIncrement() {
    if (breakCount <=59){
    setBreakCount(b => b + 1);}
  }

  function breakDecrement() {
    if(breakCount > 1){
    setBreakCount(b => b - 1);}
  }

  const reset = () => {
    setBreakCount(5);
    setSessionCount(25 * 60);
    setTimeLeft(25 * 60);
    setTimeState(false)
    timer = false
    
  };

  function getTime(t) {
    if (t === 300){
      return 5
    }else if (t === 1500){
      return 25
    }
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
  //
  function getTim(t) {
    
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
  //

  return (
    <>
      <h1>25 + 5 Clock</h1>
      <div>
        <h2 id="break-label">Break Length</h2>
        <div id="break-length">{breakCount}</div>
        <button id="break-decrement" onClick={breakDecrement}>⬇️</button>
        <button id="break-increment" onClick={breakIncrement}>⬆️</button>
      </div>
      <div>
        <h2 id="session-label">Session Length</h2>
        <div id="session-length">{getTime(sessionCount)}</div>
        <button id="session-decrement" onClick={sessionDecrement}>⬇️</button>
        <button id="session-increment" onClick={sessionIncrement}>⬆️</button>
      </div>
      <div>
        <h1 id="timer-label">Session</h1>
        <div id="time-left">{getTim(timeLeft)}</div>
        <button id="start_stop" onClick={startStop}>start or stop</button>
        <button id="reset" onClick={reset}>Reset</button>
      </div>
    </>
  );
}

export default App;