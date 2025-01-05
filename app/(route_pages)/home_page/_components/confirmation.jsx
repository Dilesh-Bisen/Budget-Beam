import React from 'react';

function Confirmation({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-xs md:max-w-sm mx-4">
                <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
                <p className="text-gray-700 mb-4 whitespace-normal break-words">{message}</p>
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 w-full md:w-auto">Cancel</button>
                    <button onClick={onConfirm} className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full md:w-auto">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
