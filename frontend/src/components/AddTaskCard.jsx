import {React, useState, useContext} from 'react'
import {PageContext} from '../helpers/Contexts'

function AddTaskCard() {
    const {pageState, setPageState, popUpState, setPopUpState} = useContext(PageContext);

    return(
        <div className="flex justify-center">
            <div className="border-3 border-gray-600 w-96 h-72 bg-[#C6CDFDDE] rounded-2xl overflow-hidden flex items-center justify-center">
                <button className="add-button" onClick={() => setPopUpState(true)}> Add <br></br>{pageState === "habits" ? "Habit" : "Task"} </button>
            </div>
        </div>
    )
}

export default AddTaskCard;

