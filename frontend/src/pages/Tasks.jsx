import React, { useContext, useEffect, useState } from "react";
import { PageContext } from '../helpers/Contexts';
import TaskCard from '../components/TaskCard';
import NavBar from "../components/NavBar";
import AddPopUp from "../components/AddPopUp";

// ✅ Moved getTasks inside this file (you can also import it if reused elsewhere)
async function getTasks() {
    const token = localStorage.getItem("authToken");

    try {
        const res = await fetch("https://beatitbackend.onrender.com/tasks", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        const data = await res.json();

        if (data.message && data.message.includes("No habits found")) {
            return [];
        } else {
            return data.habits || [];
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}

function Tasks() {
    const { pageState, setPageState } = useContext(PageContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
        }

        fetchData();
    }, []);

    return (
        <div className="h-screen w-screen flex flex-col">
            <NavBar />
            <AddPopUp />
            <div className="text-5xl px-8 pt-8">Task HubHELLO</div>
            <div className="text-3xl px-8">Complete your tasks to train your students!</div>
            <div className="p-8 w-full">
                <div className="overflow-x-auto">
                    <div className="flex gap-8 pb-8">
                        
                            <p className="text-xl text-gray-500">No tasks found.</p>
                        
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <AddTaskCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;
