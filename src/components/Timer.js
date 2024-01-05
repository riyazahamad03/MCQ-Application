import React, { useState, useEffect } from "react";

const Timer = ({ timeLimit, onTimeUp }) => {
  const [secondsLeft, setSecondsLeft] = useState(timeLimit);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp();
    }
  }, [secondsLeft, onTimeUp]);

  return <div>Time Left: {secondsLeft} seconds</div>;
};

export default Timer;
