import { useState } from "react";

const Clock = () => {

    let dt = new Date().toLocaleTimeString();
    const datestr = new Date().toDateString();
    const [clockTime, setClockTime] = useState(dt);

    const UpdateClock = () => {
        dt = new Date().toLocaleTimeString();
        setClockTime(dt);
    };

    setInterval(UpdateClock, 1000);

    return (
        <div className="clock">
            <h1> {clockTime} </h1>
            <h2> {datestr} </h2>
        </div>
    )
}

export default Clock;