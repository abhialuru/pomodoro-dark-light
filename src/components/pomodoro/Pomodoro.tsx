import { PauseCircle, PlayCircle } from "lucide-react";
import "./Pomodoro.scss";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../../Context";

function Pomodoro() {
  const { theme } = useContext(myContext);
  const [timeRemaining, setTimeRemaining] = useState(1500);
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
    if (running) {
      const id = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id);
            setRunning(false);
            alert("Pomodoro complete! Starting a new round.");
            setTimeRemaining(1500);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      setIntervalId(id);

      return () => {
        clearInterval(id);
      };
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [running, intervalId]);

  function handleControlBtn() {
    setRunning((prev) => !prev);
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
