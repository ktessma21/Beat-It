import {React} from "react";

import TaskCard from '../components/taskCard'
import NavBar from "../components/NavBar";
import AddTaskCard from "../components/AddTaskCard";

function Habits(){
    return(
        <div className="h-screen w-screen flex flex-col">
            <NavBar />
            <div className="text-5xl px-8 pt-8">Habit Hub</div>
            <div className="text-3xl px-8">Practice healthy habits to train your students!</div>
            <div className="p-8 w-full">
                <div className="overflow-x-auto">
                    <div className="flex gap-8 pb-8">
                        <AddTaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Habits