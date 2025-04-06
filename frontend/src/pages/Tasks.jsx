import React, { useContext, useEffect, useState } from "react";
import { PageContext } from '../helpers/Contexts';
import TaskCard from '../components/TaskCard';
import NavBar from "../components/NavBar";
import AddPopUp from "../components/AddPopUp";
import AddTaskCard from "../components/AddTaskCard";

function Tasks() {
    const { pageState, setPageState } = useContext(PageContext);
    const [tasks, setTasks] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Set page state on component mount
    useEffect(() => {
        setPageState("tasks");
    }, []);

    // Fetch tasks when component mounts or refreshTrigger changes
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    console.error("No authentication token found");
                    return;
                }

                const res = await fetch("https://beatitbackend.onrender.com/tasks", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch tasks");
                }

                const data = await res.json();
                if (data.tasks) {
                    setTasks(data.tasks);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [refreshTrigger]);

    // Function to trigger task list refresh
    const refreshTasks = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="h-screen w-screen flex flex-col">
            <NavBar />
            <div className="text-[#894625]">
                <div className="text-5xl px-8 pt-8">Task Hub</div>
                <div className="text-3xl px-8">Practice healthy tasks to train your students!</div>
            </div>
            <div className="p-8 w-full">
                <div className="overflow-x-auto">
                    <div className="flex gap-8 pb-8">
                        <AddTaskCard onTaskAdded={refreshTasks} />
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id || index} task={task} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;
