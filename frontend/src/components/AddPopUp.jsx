import { React, useContext, useState } from "react";
import { PageContext } from "../helpers/Contexts";

function AddPopUp({ onClose }) {
    const { pageState, setPageState } = useContext(PageContext);
    const [name, setName] = useState('');
    const [hrs, setHrs] = useState('');
    const [mins, setMins] = useState('');
    const [secs, setSecs] = useState('');
    const [days, setDays] = useState('');
    const habitOrTask = pageState === "habits" ? "Habit" : "Task";

    return (
        <div
            className="bg-white border-2 border-[#894625] rounded-2xl p-6 w-96 shadow-lg text-[#894625] z-50"
            onClick={(e) => e.stopPropagation()}
        >
            <h1 className="mb-4">Add New {habitOrTask}</h1>

            <div className="mb-4">
                <label className="block mb-1">{habitOrTask} Name:</label>
                <input
                    type="text"
                    className="w-full p-2 rounded border border-[#894625]"
                    placeholder={`${habitOrTask} Name`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Goal Time:</label>
                <div className="flex gap-2 items-center">
                    <input
                        type="number"
                        min="0"
                        className="w-1/4 p-2 rounded border border-[#894625] text-center"
                        placeholder="hrs"
                        value={hrs}
                        onChange={(e) => setHrs(e.target.value)}
                    />
                    <span>:</span>
                    <input
                        type="number"
                        min="0"
                        max="59"
                        className="w-1/4 p-2 rounded border border-[#894625] text-center"
                        placeholder="mins"
                        value={mins}
                        onChange={(e) => setMins(e.target.value)}
                    />
                    <span>:</span>
                    <input
                        type="number"
                        min="0"
                        max="59"
                        className="w-1/4 p-2 rounded border border-[#894625] text-center"
                        placeholder="secs"
                        value={secs}
                        onChange={(e) => setSecs(e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-1">Days to Complete In:</label>
                <input
                    type="number"
                    min="0"
                    className="w-full p-2 rounded border border-[#894625] text-center"
                    placeholder="days"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                />
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={onClose}
                    className="bg-[#894625] text-white px-4 py-2 rounded hover:bg-[#a86c49]"
                >
                    Cancel
                </button>
                <button
                    onClick={() => setPageState({ pageState })} // Placeholder logic
                    className="bg-white border-2 border-[#894625] text-[#894625] px-4 py-2 rounded hover:text-[#dbbcaa]"
                >
                    Create {habitOrTask}!
                </button>
            </div>
        </div>
    );
}

export default AddPopUp;
