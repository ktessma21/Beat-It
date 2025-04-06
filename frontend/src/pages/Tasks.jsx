import React, { useContext, useEffect, useState } from "react";
import { PageContext } from '../helpers/Contexts';
import TaskCard from '../components/taskCard';
import NavBar from "../components/NavBar";
import AddPopUp from "../components/AddPopUp";
import AddTaskCard from "../components/AddTaskCard";

function Tasks() {
    const { pageState, setPageState } = useContext(PageContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("authToken");

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
                setTasks(data.tasks); // Adjust this based on your backend response structure
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="h-screen w-screen flex flex-col">
            <NavBar />
            {/* <AddPopUp />  */}
            <div className="text-5xl px-8 pt-8">Task Hub</div>
            <div className="text-3xl px-8">Practice healthy tasks to train your students!</div>
            <div className="p-8 w-full">
                <div className="overflow-x-auto">
                    <div className="flex gap-8 pb-8">
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id || index} task={task} />
                        ))}
                        <AddTaskCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;
