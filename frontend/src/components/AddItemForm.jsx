import React, { useState, useContext, useEffect } from 'react';
import { PageContext } from '../helpers/Contexts';
import { fetchHabits } from '../pages/Habits';


function AddItemForm() {
    const { pageState, setPageState, popUpState, setPopUpState } = useContext(PageContext);

    const [formData, setFormData] = useState({
        name: '',
        goalTime: '',
        frequency: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const isHabit = pageState === "habits";

    // Reset form state when popup opens
    useEffect(() => {
        if (popUpState) {
            setFormData({ name: '', goalTime: '', frequency: '' });
            setError('');
            setSuccess('');
        }
    }, [popUpState]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem("authToken");

            if (!token) {
                setError("Authentication token not found. Please log in again.");
                setLoading(false);
                return;
            }

            const requestData = isHabit
                ? {
                    habit_name: formData.name,
                    goal_time: parseInt(formData.goalTime),
                    days_per_week: parseInt(formData.frequency) || 3
                }
                : {
                    task_name: formData.name,
                    goal_time: parseInt(formData.goalTime),
                    deadline_days: parseInt(formData.frequency) || 7
                };

            const endpoint = isHabit ? '/habits' : '/tasks';

            const response = await fetch(`https://beatitbackend.onrender.com${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Failed to add ${isHabit ? 'habit' : 'task'}`);
            }

            setSuccess(data.message || `${isHabit ? 'Habit' : 'Task'} added successfully`);

            // Delay popup close and reload for feedback
            setTimeout(() => {
                setPopUpState(false);
                // Reload the window for both tasks and habits
                window.location.reload();
            }, 1000);

        } catch (error) {
            setError(error.message || `An error occurred while adding the ${isHabit ? 'habit' : 'task'}`);
        } finally {
            setLoading(false);
        }
    };

    if (!popUpState) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-[#C6CDFDDE] border-3 border-gray-600 rounded-2xl p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Add New {isHabit ? 'Habit' : 'Task'}</h2>
                    <button
                        onClick={() => setPopUpState(false)}
                        className="text-black hover:text-gray-700"
                    >
                        ✖
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block font-medium mb-1" htmlFor="name">
                            {isHabit ? 'Habit' : 'Task'} Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium mb-1" htmlFor="goalTime">
                            Goal Time (minutes)
                        </label>
                        <input
                            type="number"
                            id="goalTime"
                            name="goalTime"
                            value={formData.goalTime}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded"
                            required
                            min="1"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1" htmlFor="frequency">
                            {isHabit ? 'Days Per Week' : 'Deadline (days)'}
                        </label>
                        <input
                            type="number"
                            id="frequency"
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded"
                            placeholder={isHabit ? 'Default: 3' : 'Default: 7'}
                            min="1"
                            max={isHabit ? '7' : '365'}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setPopUpState(false)}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddItemForm;
