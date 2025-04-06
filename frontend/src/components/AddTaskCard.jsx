import React, { useState } from 'react';
import AddPopUp from './AddPopUp'; // update path as needed

function AddTaskCard() {
    const [showPopup, setShowPopup] = useState(false);

    const handleOverlayClick = (e) => {
        if (e.target.id === 'popup-overlay') {
            setShowPopup(false);
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="border-3 border-gray-600 w-96 h-72 bg-[#C6CDFDDE] relative rounded-2xl overflow-hidden">
                    <img
                        className="w-56 relative top-20 left-6 z-10"
                        src="/pictures/girl.png"
                        alt="piano boy/girl"
                    />
                    <div className="w-full h-28 absolute bottom-0 bg-[#b96244] z-0"></div>
                    <div className="absolute top-0 flex justify-between w-full py-3 px-6 text-[#894625] text-4xl">
                        <p>Example Task</p>
                    </div>

                    {/* Button to open modal */}
                    <div className="flex absolute bottom-2 right-6 gap-2">
                        <button
                            onClick={() => setShowPopup(true)}
                            className="bg-white py-1 px-3 text-3xl rounded-2xl border-2 text-[#894625] hover:text-[#dbbcaa]"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Popup */}
            {showPopup && (
                <div
                    id="popup-overlay"
                    className="fixed inset-0 z-40 bg-black bg-opacity-40 flex justify-center items-center"
                    onClick={handleOverlayClick}
                >
                    <AddPopUp onClose={() => setShowPopup(false)} />
                </div>
            )}
        </>
    );
}

export default AddTaskCard;
