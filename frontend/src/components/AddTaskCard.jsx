import {React, useState, useContext} from 'react'
import {PageContext} from '../helpers/Contexts'

function AddTaskCard({ onTaskAdded }) {
    const {pageState, setPageState, popUpState, setPopUpState} = useContext(PageContext);

    const handleAddClick = () => {
        setPopUpState(true);
        // If a task is added, trigger the refresh
        if (onTaskAdded) {
            onTaskAdded();
        }
    };

    return(
        <div className="flex justify-center">
            <div className="border-3 border-gray-600 w-96 h-72 bg-[#C6CDFDDE] rounded-2xl overflow-hidden flex items-center justify-center">
                <button className="add-button" onClick={handleAddClick}> 
                    Add <br></br>{pageState === "habits" ? "Habit" : "Task"} 
                </button>
            </div>
        </div>
    )
}

export default AddTaskCard;

