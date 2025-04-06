import React, { useState, useEffect } from 'react';

function HabitCard({ habit }) {
    // Use habit prop or fallback to default values
    const habitId = habit?.id || "123";
    const habitName = habit?.habit_name || "Example Habit";
    const daysOfWeek = habit?.days_of_week || [];
    
    // Set initial time (converting minutes to seconds if goal_time exists)
    const initialTime = habit?.goal_time ? habit.goal_time * 60 : 60;
    
    // Use localStorage to persist timer state across tab navigation
    const storageKey = `habit_timer_${habitId}`;
    const storedState = JSON.parse(localStorage.getItem(storageKey) || '{}');
    
    const [time, setTime] = useState(storedState.time !== undefined ? storedState.time : initialTime);
    const [isRunning, setIsRunning] = useState(storedState.isRunning || false);
    const [lastUpdated, setLastUpdated] = useState(storedState.lastUpdated || Date.now());
    
    // Format time as MM:SS or HH:MM:SS
    const formatTime = () => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        
        return `${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    // Save state to localStorage
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify({
            time,
            isRunning,
            lastUpdated: Date.now()
        }));
    }, [time, isRunning, storageKey]);
    
    // Check for time passage while away
    useEffect(() => {
        if (isRunning && lastUpdated) {
            const now = Date.now();
            const elapsedSeconds = Math.floor((now - lastUpdated) / 1000);
            
            if (elapsedSeconds > 0 && time > 0) {
                // Calculate new time, don't go below 0
                const newTime = Math.max(0, time - elapsedSeconds);
                setTime(newTime);
                
                // If timer reached zero while away
                if (newTime === 0) {
                    setIsRunning(false);
                }
            }
        }
        
        setLastUpdated(Date.now());
    }, []);
    
    // Timer effect - countdown
    useEffect(() => {
        let interval;
        
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    const newTime = prevTime - 1;
                    if (newTime <= 0) {
                        clearInterval(interval);
                        setIsRunning(false);
                        return 0;
                    }
                    return newTime;
                });
                setLastUpdated(Date.now());
            }, 1000);
        }
        
        return () => clearInterval(interval);
    }, [isRunning]);
    
    // Handle Start/Stop button click
    function handleClick() {
        if (!isRunning) {
            // If time is 0, reset to initial time before starting
            if (time === 0) {
                setTime(initialTime);
            }
            setIsRunning(true);
        } else {
            setIsRunning(false);
        }
    }
    
    // Reset timer to initial value
    function handleReset() {
        setIsRunning(false);
        setTime(initialTime);
    }
    
    // Format days of week for display
    const formatDaysOfWeek = () => {
        if (!daysOfWeek || daysOfWeek.length === 0) return "";
        
        const dayAbbreviations = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
        return dayAbbreviations
            .map((day, index) => daysOfWeek.includes(index) ? day : null)
            .filter(Boolean)
            .join(', ');
    };
    
    const playerNum = Math.floor(Math.random() * 6) + 1;
    
    return (
        <div className="flex justify-center">
            <div className="border-3 border-gray-600 w-96 h-72 bg-[#F2D7D9] relative rounded-2xl overflow-hidden">
                <img
                    className="w-56 relative top-20 left-6 z-10"
                    src={`/pictures/player${playerNum}.gif`}
                    alt="piano boy/girl"
                />
                <div className="w-full h-28 absolute bottom-0 bg-[#D14D72] z-0"></div>
                <div className="absolute top-0 flex justify-between w-full py-3 px-6 text-[#8F4F4F] text-4xl">
                    <div>
                        <p className="truncate max-w-48">{habitName}</p>
                        <p className="text-sm mt-1">{formatDaysOfWeek()}</p>
                    </div>
                    <p className={`${isRunning && time <= 60 ? 'animate-pulse' : ''}`}>{formatTime()}</p>
                </div>

                {/* Buttons */}
                <div className="flex absolute bottom-2 right-6 gap-2">
                    <button 
                        onClick={handleReset}
                        className="bg-white py-1 px-3 text-3xl rounded-2xl border-2 text-[#8F4F4F] hover:text-[#D99C9C]"
                    >
                        Reset
                    </button>
                    <button 
                        onClick={handleClick}
                        className="bg-white py-1 px-3 text-3xl rounded-2xl border-2 text-[#8F4F4F] hover:text-[#D99C9C]"
                    >
                        {isRunning ? 'Stop!' : 'Start!'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HabitCard;