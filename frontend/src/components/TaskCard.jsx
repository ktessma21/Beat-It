import React, { useEffect, useState } from 'react';

function TaskCard({ task }) {
    console.log("TaskCard task:", task); // Debugging line
    task = task || { task_name: "Default Task", goal_time: 0, deadline: "2023-12-31" }; // Default task for debugging
    const { task_name, goal_time, deadline } = task;

    const initialTime = goal_time * 60; // convert minutes to seconds
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);

    // Timer countdown
    useEffect(() => {
        let interval;

        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsRunning(false);
                        updateTimerInBackend(0);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, time]);

    // Format time as HH:MM:SS
    const formatTime = () => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };

    const handleClick = () => {
        if (!isRunning) {
            if (time === 0) setTime(initialTime);
            setIsRunning(true);
        } else {
            setIsRunning(false);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(initialTime);
        updateTimerInBackend(initialTime);
    };

    const updateTimerInBackend = async (timeInSeconds) => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await fetch(`https://beatitbackend.onrender.com/api/tasks/${task.task_id || 1}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ timeInSeconds }),
            });

            if (!res.ok) {
                console.error("Failed to update time in backend.");
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="border-3 border-gray-600 w-96 h-72 bg-[#C6CDFDDE] relative rounded-2xl overflow-hidden">
                <img
                    className="w-56 relative top-20 left-6 z-10"
                    src="/pictures/girl.png"
                    alt="student"
                />
                <div className="w-full h-28 absolute bottom-0 bg-[#b96244] z-0"></div>
                <div className="absolute top-0 flex justify-between w-full py-3 px-6 text-[#894625] text-4xl">
                    <p>{task_name}</p>
                    <p className={`${isRunning && time <= 60 ? 'animate-pulse' : ''}`}>{formatTime()}</p>
                </div>

                <div className="flex absolute bottom-2 right-6 gap-2">
                    <button
                        onClick={handleReset}
                        className="bg-white py-1 px-3 text-3xl rounded-2xl border-2 text-[#894625] hover:text-[#dbbcaa]"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleClick}
                        className="bg-white py-1 px-3 text-3xl rounded-2xl border-2 text-[#894625] hover:text-[#dbbcaa]"
                    >
                        {isRunning ? 'Stop!' : 'Start!'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
