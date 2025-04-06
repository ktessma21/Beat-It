import React, { useContext, useEffect, useState } from "react";
import { PageContext } from '../helpers/Contexts';
import HabitCard from '../components/HabitCard';
import NavBar from "../components/NavBar";
import AddTaskCard from "../components/AddTaskCard";

function Habits() {
    const { pageState, setPageState } = useContext(PageContext);
    const [habits, setHabits] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
    // Set the page state outside of JSX
    useEffect(() => {
        setPageState("habits");
    }, [setPageState]);

    // Fetch habits from the backend
    const fetchHabits = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("No authentication token found");
                return;
            }

            const res = await fetch("https://beatitbackend.onrender.com/habits", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            if (!res.ok) {
                throw new Error("Failed to fetch habits");
            }

            const data = await res.json();
            if (data.habits) {
                setHabits(data.habits);
            }
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    };

    // Initial fetch and setup refresh interval
    useEffect(() => {
        fetchHabits();
        
        // Set up an interval to periodically refresh the habits
        const intervalId = setInterval(() => {
            fetchHabits();
        }, 5000); // Check for new habits every 5 seconds
        
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [refreshTrigger]);

    // Function to trigger habit list refresh
    const refreshHabits = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="h-screen w-screen flex flex-col">
            <NavBar />
            <div className="text-5xl px-8 pt-8">Habit Hub</div>
            <div className="text-3xl px-8">Build healthy habits to improve your students!</div>
            <div className="p-8 w-full">
                <div className="overflow-x-auto">
                    <div className="flex gap-8 pb-8">
                        <AddTaskCard onTaskAdded={refreshHabits} />
                        {habits.map((habit, index) => (
                            <HabitCard key={habit.id || index} habit={habit} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Habits;