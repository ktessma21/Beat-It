import React, { useContext, useEffect, useState } from "react";
import { PageContext } from '../helpers/Contexts';

import TaskCard from '../components/taskCard'
import NavBar from "../components/NavBar";
import AddTaskCard from "../components/AddTaskCard";

function Habits() {
    const { pageState, setPageState } = useContext(PageContext);
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const token = localStorage.getItem("authToken");

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
                setHabits(data.habits); // Adjust if your backend sends a different shape
            } catch (error) {
                console.error("Error fetching habits:", error);
            }
        };

        fetchHabits();
    }, []);

    return (
        <div className="h-screen w-screen flex flex-col">
            <NavBar />
        </div>
    );
}

export default Habits;
