import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { db } from "@/utils/db_config";
import { eq } from "drizzle-orm";
import { Expenses } from "@/utils/my_schema";
import { toast } from "react-toastify";

function ExpenseForm({ newExpense, setNewExpense, editingExpense, setEditingExpense, errorMessage, setErrorMessage, fetchExpenses, budgetItem, editExpenseRef, expenses }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const getNextAvailableId = async () => {
    try {
      const existingIds = await db
        .select({ id: Expenses.id })
        .from(Expenses)
        .orderBy(Expenses.id);

      for (let i = 1; i <= existingIds.length + 1; i++) {
        if (!existingIds.some((record) => record.id === i)) {
          return i;
        }
      }
    } catch (error) {
      console.error("Error getting next available ID:", error);
      toast.error("Failed to get next available ID. Please try again.", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw error;
    }
  };

  const handleCreateExpense = async () => {
    setErrorMessage("");
    if (!newExpense.budget_name || !newExpense.amount || parseFloat(newExpense.amount) <= 0) {
      setErrorMessage("Please ensure all fields are filled.");
      return;
    }

    const totalSpent = expenses.reduce((total, expense) => total + expense.amount, 0);
    const newTotalSpent = totalSpent + parseFloat(newExpense.amount);

    if (newTotalSpent > budgetItem.amount) {
      setErrorMessage("Total spent exceeds the total budget.");
      return;
    }

    try {
      const nextId = await getNextAvailableId();
      const result = await db.insert(Expenses).values({
        id: nextId,
        ...newExpense,
        amount: parseFloat(newExpense.amount),
        email: budgetItem.email,
      });

      if (result) {
        toast.success("Expense created successfully!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setNewExpense({
          budget_name: "",
          icon: budgetItem.icon,
          amount: "",
          budget_ID: budgetItem.id,
          email: "",
          tags: "",
          notes: ""
        });
        fetchExpenses();
      }
    } catch (error) {
      console.error("Error creating expense:", error);
      toast.error("Failed to create expense. Please try again.", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleUpdateExpense = async () => {
    setErrorMessage("");
    if (!newExpense.budget_name || !newExpense.amount || parseFloat(newExpense.amount) <= 0) {
      setErrorMessage("Please ensure all fields are filled.");
      return;
    }

    const totalSpent = expenses.reduce((total, expense) => total + expense.amount, 0);
    const currentExpenseAmount = expenses.find(expense => expense.id === newExpense.id)?.amount || 0;
    const newTotalSpent = totalSpent - currentExpenseAmount + parseFloat(newExpense.amount);

    if (newTotalSpent > budgetItem.amount) {
      setErrorMessage("Total spent exceeds the total budget.");
      return;
    }

    try {
      const result = await db.update(Expenses).set(newExpense).where(eq(Expenses.id, newExpense.id));

      if (result) {
        toast.success("Expense updated successfully!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setEditingExpense(null);
        setNewExpense({
          budget_name: "",
          icon: budgetItem.icon,
          amount: "",
          budget_ID: budgetItem.id,
          email: "",
          tags: "",
          notes: ""
        });
        fetchExpenses();
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error("Failed to update expense. Please try again.", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md" ref={editExpenseRef}>
      <h2 className="text-2xl font-bold mb-4">{editingExpense ? "Edit Expense" : "Add New Expense"}</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Expense Name
        </label>
        <input
          type="text"
          value={newExpense.budget_name}
          onChange={(e) => setNewExpense({ ...newExpense, budget_name: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. Clothes"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Amount (Rs.)
        </label>
        <input
          type="number"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. 1000"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Icon
        </label>
        <div className="flex items-center">
          <input
            type="text"
            value={newExpense.icon}
            onChange={(e) => setNewExpense({ ...newExpense, icon: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            placeholder="Select an emoji"
            readOnly
          />
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showEmojiPicker ? "Close" : "Pick_Emoji"}
          </button>
        </div>
        {showEmojiPicker && (
          <div className="mt-2">
            <EmojiPicker
              onEmojiClick={(e) => {
                setNewExpense({ ...newExpense, icon: e.emoji });
                setShowEmojiPicker(false);
              }}
            />
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tags
        </label>
        <input
          type="text"
          value={newExpense.tags}
          onChange={(e) => setNewExpense({ ...newExpense, tags: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g. shopping, food, travel"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Notes
        </label>
        <textarea
          value={newExpense.notes}
          onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Additional notes..."
        />
      </div>
      <button
        onClick={editingExpense ? handleUpdateExpense : handleCreateExpense}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </div>
  );
}

export default ExpenseForm;
