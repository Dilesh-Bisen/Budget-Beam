"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from "@/utils/db_config";
import { Budgets } from "@/utils/my_schema";
import { eq } from "drizzle-orm";
import Confirmation from './confirmation';
import EmojiPicker from 'emoji-picker-react';
import { useRouter } from 'next/navigation';

function BudgetItem({ budget, onDelete, onUpdate, isEditing, onEditStart, onEditEnd, isViewingDetails, onViewDetails }) {
    const [editedBudget, setEditedBudget] = useState({
        ...budget,
        budget_name: budget.budget_name || '',
        amount: budget.amount || '',
        total_items: budget.total_items || 0,
        total_spend: budget.total_spend || 0,
        icon: budget.icon || ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const confirmationRef = useRef(null);
    const emojiPickerRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (confirmationRef.current && !confirmationRef.current.contains(event.target)) {
                setIsConfirmingDelete(false);
            }
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [confirmationRef, emojiPickerRef]);

    const handleEdit = useCallback(() => {
        if (isEditing) {
            onEditEnd();
        } else {
            onEditStart();
        }
    }, [isEditing, onEditStart, onEditEnd]);

    const handleSave = useCallback(async () => {
        if (parseFloat(editedBudget.total_spend) > parseFloat(editedBudget.amount)) {
            setErrorMessage("Total spend cannot exceed the total amount.");
            return;
        }
        try {
            const existingBudget = await db.select().from(Budgets).where(eq(Budgets.id, budget.id));
            if (existingBudget.length > 0) {
                await db.update(Budgets).set(editedBudget).where(eq(Budgets.id, budget.id));
                onUpdate(editedBudget);
                onEditEnd();
                setErrorMessage('');
            } else {
                setErrorMessage("Budget with the same ID already exists.");
            }
        } catch (error) {
            console.error("Error saving budget:", error);
            if (error.message.includes("duplicate key value")) {
                setErrorMessage("A budget with the same ID already exists.");
            } else {
                setErrorMessage("Failed to save budget. Please try again.");
            }
        }
    }, [editedBudget, budget.id, onUpdate, onEditEnd]);

    const handleDelete = useCallback(async () => {
        try {
            await db.delete(Budgets).where(eq(Budgets.id, budget.id));
            onDelete(budget.id);
            setIsConfirmingDelete(false);
        } catch (error) {
            console.error("Error deleting budget:", error);
        }
    }, [budget.id, onDelete]);

    const handleViewDetails = useCallback(() => {
        if (isViewingDetails) {
            onViewDetails(null);
        } else {
            onViewDetails(budget.id);
        }
    }, [isViewingDetails, onViewDetails, budget.id]);

    const handleEmojiClick = useCallback((emojiObject) => {
        setEditedBudget({ ...editedBudget, icon: emojiObject.emoji });
        setShowEmojiPicker(false);
    }, [editedBudget]);

    const handleBudgetItemClick = useCallback(() => {
        router.push(`/costlog_page/${budget.id}`);
    }, [router, budget.id]);

    const totalSpend = budget.total_spend !== undefined ? budget.total_spend : 0;
    const remainingAmount = budget.amount - totalSpend;
    const progressPercentage = (totalSpend / budget.amount) * 100;

    return (
        <div className="budget-item-container">
            <div className="bg-white p-4 rounded-lg shadow-md relative hover:shadow-xl hover:transform hover:scale-105 transition-transform duration-300">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={handleBudgetItemClick}
                >
                    <div className="flex items-center">
                        <div className="icon-circle bg-gray-200 p-2 rounded-full">
                            <h2 className="text-xl font-semibold">{budget?.icon}</h2>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-base font-medium">{budget.budget_name}</h2>
                            <h2 className="text-sm text-gray-500">{budget.total_items} items</h2>
                        </div>
                    </div>
                    <h2 className="text-lg font-semibold text-black">Rs.{budget.amount}</h2>
                </div>
                <div className="mt-5">
                    <div className="w-full bg-slate-200 h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(); }}
                        className="text-blue-700 bg-transparent border-none focus:outline-none hover:text-blue-900 transition duration-300 hover:font-bold"
                    >
                        {isEditing ? 'Cancel Edit' : 'Edit'}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsConfirmingDelete(true); }}
                        className="text-red-500 bg-transparent border-none focus:outline-none hover:text-red-900 transition duration-300 hover:font-bold"
                    >
                        Delete
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}
                        className="text-green-600 bg-transparent border-none focus:outline-none hover:text-green-900 transition duration-300 hover:font-bold"
                    >
                        {isViewingDetails ? 'Hide Details' : 'View Details'}
                    </button>
                </div>
                {isEditing && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                        <div className="flex items-center mb-2">
                            <div className="icon-circle bg-gray-200 p-2 rounded-full mr-2" onClick={() => setShowEmojiPicker(true)}>
                                <h2 className="text-xl font-semibold">{editedBudget.icon}</h2>
                            </div>
                            {showEmojiPicker && (
                                <div className="emoji-picker-container w-48" ref={emojiPickerRef}>
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                </div>
                            )}
                        </div>
                        <input
                            type="text"
                            value={editedBudget.budget_name}
                            onChange={(e) => setEditedBudget({ ...editedBudget, budget_name: e.target.value })}
                            className="border p-2 mb-2 w-full rounded"
                            placeholder="Budget-Name"
                        />
                        <input
                            type="number"
                            value={editedBudget.amount}
                            onChange={(e) => setEditedBudget({ ...editedBudget, amount: e.target.value })}
                            className="border p-2 mb-2 w-full rounded"
                            placeholder="Budget-Amount"
                        />
                        <input
                            type="number"
                            value={editedBudget.total_items}
                            onChange={(e) => setEditedBudget({ ...editedBudget, total_items: e.target.value })}
                            className="border p-2 mb-2 w-full rounded"
                            placeholder="Total Items"
                        />
                        <input
                            type="number"
                            value={editedBudget.total_spend}
                            onChange={(e) => setEditedBudget({ ...editedBudget, total_spend: e.target.value })}
                            className="border p-2 mb-2 w-full rounded"
                            placeholder="Total Spend"
                        />
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                        <button
                            onClick={handleSave}
                            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 transition duration-300"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
            {isViewingDetails && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium">Details:</h3>
                    <p>Budget-Name: {budget.budget_name}</p>
                    <p>Budget-Amount: {budget.amount}</p>
                    <p>Total Items: {budget.total_items}</p>
                    <p>Total Spend: {budget.total_spend ?? 0}</p>
                    <p>Remaining Amount: {remainingAmount}</p>
                </div>
            )}
            <Confirmation
                isOpen={isConfirmingDelete}
                onClose={() => setIsConfirmingDelete(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this budget item?"
                ref={confirmationRef}
            />
            <style jsx>{`
                .budget-item-container:hover .bg-white {
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transform: scale(1.05);
                    transition: transform 0.3s, box-shadow 0.3s;
                }
                .confirmation-dialog {
                    position: fixed;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 50;
                }
                .confirmation-dialog .dialog-box {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
}

export default BudgetItem;
