import {useContext, useState, createContext, useRef} from 'react';

const TimerContext = createContext();

export function useTimer() {
  return useContext(TimerContext)
}

export function TimerProvider({children}) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);


  const timerReset = async () => {
    setElapsedTime(0);

    await timerPause()
  }


  const timerPause = async () => {
    setFinalTime(elapsedTime);
    setIsRunning(false);
    clearInterval(intervalRef.current);

    console.log("Final Time: ", elapsedTime);
  }

  const timerOn = async () => {
    intervalRef.current = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 0.01);
    }, 10);

    setIsRunning(true);
  }

  const toggleTimer = async () => {
    if (isRunning) {
      await timerPause();
    } else {
      await timerOn();
    }
  };

  return (
    <TimerContext.Provider value={{elapsedTime, toggleTimer, finalTime, isRunning, timerPause, timerOn, timerReset}}>
      {children}
    </TimerContext.Provider>
  );
}