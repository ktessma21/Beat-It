import {React, useContext, useState} from "react";
import {PageContext} from '../helpers/Contexts'

function AddPopUp({ onItemAdded }){
    const {pageState, setPageState, popUpState, setPopUpState} = useContext(PageContext);
    const [name, setName] = useState('');
    const [hrs, setHrs] = useState('');
    const [mins, setMins] = useState('');
    const [secs, setSecs] = useState('');
    const [days, setDays] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const habitOrTask = pageState === "habits" ? "Habit" : "Task";

    const validateTime = () => {
        // Convert inputs to numbers, defaulting to 0 if empty or NaN
        const hoursVal = parseInt(hrs) || 0;
        const minsVal = parseInt(mins) || 0;
        const secsVal = parseInt(secs) || 0;
        
        // Basic validation
        if (hoursVal < 0 || minsVal < 0 || secsVal < 0) {
            setError("Time values cannot be negative");
            return null;
        }
        
        if (minsVal > 59) {
            setError("Minutes must be between 0 and 59");
            return null;
        }
        
        if (secsVal > 59) {
            setError("Seconds must be between 0 and 59");
            return null;
        }
        
        // Calculate total minutes more precisely
        const totalMinutes = hoursVal * 60 + minsVal + (secsVal / 60);
        
        // Ensure there's at least some time entered
        if (totalMinutes <= 0) {
            setError("Please enter a valid time");
            return null;
        }
        
        // You might want to add a maximum reasonable limit
        if (totalMinutes > 10080) { // One week in minutes
            setError("Time cannot exceed one week");
            return null;
        }
        
        return totalMinutes;
    };
    
    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError('');
            
            // Form validation
            if (!name.trim()) {
                setError(`Please enter a ${habitOrTask.toLowerCase()} name`);
                return;
            }
            
            // Validate time inputs
            const totalMinutes = validateTime();
            if (totalMinutes === null) {
                return; // Validation failed
            }
            
            if (!days) {
                setError(`Please enter days to complete`);
                return;
            }
            
            const daysVal = parseInt(days) || 0;
            if (daysVal <= 0) {
                setError("Days must be greater than 0");
                return;
            }
            
            // Get authentication token
            const token = localStorage.getItem("authToken");
            if (!token) {
                setError("You must be logged in");
                return;
            }
            
            console.log("Preparing to submit form data");
            
            // Create payload based on whether it's a habit or task
            const payload = pageState === "habits" 
                ? {
                    habit_name: name.trim(),
                    goal_time: Math.round(totalMinutes), // Round to nearest minute for API
                    days_per_week: daysVal
                  }
                : {
                    task_name: name.trim(),
                    goal_time: Math.round(totalMinutes), // Round to nearest minute for API
                    deadline_days: daysVal
                  };
            
            // API endpoint
            const endpoint = pageState === "habits" ? "/habits" : "/tasks";
            
            console.log(`Making POST request to ${endpoint} with data:`, payload);
            
            // Make API call
            const response = await fetch(`https://beatitbackend.onrender.com${endpoint}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            
            console.log("Response status:", response.status);
            
            const data = await response.json();
            console.log("Response data:", data);
            
            if (!response.ok) {
                throw new Error(data.message || `Failed to create ${habitOrTask.toLowerCase()}`);
            }
            
            // Reset form
            setName("");
            setHrs("");
            setMins("");
            setSecs("");
            setDays("");
            
            // Close popup
            setPopUpState(false);
            
            // Instead of reloading the page, call the callback function to refresh data
            if (typeof onItemAdded === 'function') {
                onItemAdded();
            }
            
        } catch (error) {
            console.error("Error in form submission:", error);
            setError(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="body">
            <div className="AddPopUp">
                <div className="add-fields">
                    <h1>Add New {habitOrTask}</h1>
                    <button 
                        className="close-button" 
                        onClick={() => setPopUpState(false)}
                        type="button"
                    >
                        x
                    </button>
                </div>
                
                {error && (
                    <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
                        {error}
                    </div>
                )}
                
                <div className="add-fields">
                    <h2>{habitOrTask} Name:</h2>
                    <input
                        type="text"
                        id="name"
                        placeholder={`${habitOrTask} Name`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="add-fields">
                    <h2>Goal Time:</h2>
                    <input
                        className="number-input"
                        type="number"
                        min="0"
                        id="hrs"
                        placeholder="hrs"
                        value={hrs}
                        onChange={(e) => setHrs(e.target.value)}
                    />
                    <h1>:</h1>
                    <input
                        className="number-input"
                        type="number"
                        min="0"
                        max="59"
                        id="mins"
                        placeholder="mins"
                        value={mins}
                        onChange={(e) => setMins(e.target.value)}
                    />
                    <h1>:</h1>
                    <input
                        className="number-input"
                        type="number"
                        min="0"
                        max="59"
                        id="secs"
                        placeholder="secs"
                        value={secs}
                        onChange={(e) => setSecs(e.target.value)}
                    />
                </div>
                <div className="add-fields">
                    <h2>Days to Complete In:</h2>
                    <input
                        className="number-input"
                        type="number"
                        min="0"
                        id="days"
                        placeholder="days"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                    />
                </div>
                <div>
                    <button 
                        className="pop-button" 
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : `Create ${habitOrTask}!`}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddPopUp