import { useEffect, useState } from "react";

function Stopwatch(props) {
    let [time, setTime] = useState(0);
    let [isRunning, setIsRunning] = useState(false);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    const restart = () => {
        setIsRunning(false);
        setTime(0);
    }

    const buttonText = isRunning ? "Stop" : "Start";

    return (
        <div>
            <h1>Stopwatch</h1>
            <p>
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}:
                {milliseconds.toString().padStart(2, "0")}
            </p>
            <button onClick={startAndStop}>{buttonText}</button>
            <button onClick={restart}>Restart</button>
        </div>
    )
}

export default Stopwatch;