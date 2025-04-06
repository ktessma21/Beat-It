import React, { useContext, useEffect, useState } from "react";
import { PageContext } from '../helpers/Contexts';
import HabitCard from '../components/HabitCard';
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

                if (res.status === 404) {
                    console.error("Habits not found");
                    return;
                }

                const data = await res.json();
                setHabits(data.habits); // Adjust this based on your backend response structure
            } catch (error) {
                console.error("Error fetching habits:", error);
            }
        };

        fetchHabits();
    }, []);

    return (
        <div className="h-screen w-screen flex flex-col">
            <NavBar />
            <div className="text-[#894625]">
                <div className="text-5xl px-8 pt-8">Habit Hub</div>
                <div className="text-3xl px-8">Build healthy habits to improve your students!</div>
            </div>
            <div className="p-8 w-full">
                <div className="overflow-x-auto">
                    <div className="flex gap-8 pb-8">
                        {
                            useEffect(() => {
                                setPageState("habits");
                            }, [])
                        }
                        <AddTaskCard />
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