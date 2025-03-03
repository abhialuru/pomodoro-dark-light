import { PauseCircle, PlayCircle } from "lucide-react";
import "./Pomodoro.scss";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../../Context";

function Pomodoro() {
  const { theme } = useContext(myContext);
  const [timeRemaining, setTimeRemaining] = useState(1500); // 25 minutes in seconds
  const [running, setRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    // If the timer is running, start the interval
    if (running) {
      const id = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id); // Clear the interval when the time reaches 0
            setRunning(false); // Stop the timer
            alert("Pomodoro complete! Starting a new round."); // Show alert when timer completes
            setTimeRemaining(1500); // Reset the timer to 25 minutes
            return 0;
          }
          return prevTime - 1; // Decrease time by 1 second
        });
      }, 1000);

      setIntervalId(id); // Store the interval ID

      // Cleanup: Clear the interval when the timer is paused or when the component unmounts
      return () => {
        clearInterval(id);
      };
    } else {
      // If the timer is paused, clear the interval if it exists
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [running]); // Depend only on 'running', to avoid overlapping intervals

  function handleControlBtn() {
    setRunning((prev) => !prev); // Toggle the running state
  }

  return (
    <div className={`pomodoro-container ${theme}`}>
      <div className="timer-container">
        <h1>Pomodoro Timer</h1>
        <div className="time">{formatTime(timeRemaining)}</div>
        <div className="controls">
          {!running ? (
            <PlayCircle onClick={handleControlBtn} className="control-btn" />
          ) : (
            <PauseCircle onClick={handleControlBtn} className="control-btn" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
