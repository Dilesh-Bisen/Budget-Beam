import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/utils/db_config";
import { eq } from "drizzle-orm";
import { Expenses } from "@/utils/my_schema";
import { toast } from "react-toastify";

function ExpenseList({ expenses, setEditingExpense, setNewExpense, fetchExpenses, editExpenseRef }) {
    const handleEditExpense = (id) => {
        const expenseToEdit = expenses.find(expense => expense.id === id);
        setEditingExpense(expenseToEdit);
        setNewExpense(expenseToEdit);
        editExpenseRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDeleteExpense = async (id) => {
        try {
            const result = await db.delete(Expenses).where(eq(Expenses.id, id));

            if (result) {
                toast.success("Expense deleted successfully!", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                fetchExpenses();
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
            toast.error("Failed to delete expense. Please try again.", {
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
        <div className="mt-8 w-full">
            <h2 className="text-2xl font-bold mb-4">Expenses</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left sticky top-0 bg-gray-200">Icon</th>
                            <th className="py-3 px-6 text-left sticky top-0 bg-gray-200">Name</th>
                            <th className="py-3 px-6 text-left sticky top-0 bg-gray-200">Amount</th>
                            <th className="py-3 px-6 text-left sticky top-0 bg-gray-200">Tags</th>
                            <th className="py-3 px-6 text-left sticky top-0 bg-gray-200">Notes</th>
                            <th className="py-3 px-6 text-center sticky top-0 bg-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-normal break-words max-w-xs">
                                    <div className="flex items-center">
                                        <div className="icon-circle bg-gray-200 p-2 rounded-full w-8 h-8 flex items-center justify-center">
                                            <span className="text-xl font-semibold">{expense.icon}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-normal break-words max-w-xs name-column">{expense.budget_name}</td>
                                <td className="py-3 px-6 text-left whitespace-normal break-words max-w-xs">Rs.{expense.amount}</td>
                                <td className="py-3 px-6 text-left whitespace-normal break-words max-w-xs tags-column">{expense.tags}</td>
                                <td className="py-3 px-6 text-left whitespace-normal break-words max-w-xs notes-column">{expense.notes}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex justify-center space-x-2">
                                        <div className="bg-blue-200 p-2 rounded shadow-md w-16 flex items-center justify-center">
                                            <button
                                                onClick={() => handleEditExpense(expense.id)}
                                                className="text-blue-600 bg-transparent border-none focus:outline-none hover:text-blue-800 transition duration-300 hover:font-bold"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        <div className="bg-red-200 p-2 rounded shadow-md w-16 flex items-center justify-center">
                                            <button
                                                onClick={() => handleDeleteExpense(expense.id)}
                                                className="text-red-600 bg-transparent border-none focus:outline-none hover:text-red-800 transition duration-300 hover:font-bold"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ExpenseListSkeleton() {
    return (
        <div className="mt-8 w-full">
            <h2 className="text-2xl font-bold mb-4">Expenses</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left sticky top-0 bg-gray-200">
                                <Skeleton className="h-6 w-full min-w-[70px] " />
                            </th>
                            <th className="py-3 px-6 text-left sticky top-0 bg-gray-200">
                                <Skeleton className="h-6 w-full min-w-[70px] " />
                            </th>
                            <th className="py-3 px-6 text-left sticky top-0 bg-gray-200">
                                <Skeleton className="h-6 w-full min-w-[70px] " />
                            </th>
                            <th className="py-3 px-6 text-left sticky top-0 bg-gray-200">
                                <Skeleton className="h-6 w-full min-w-[70px] " />
                            </th>
                            <th className="py-3 px-6 text-left sticky top-0 bg-gray-200">
                                <Skeleton className="h-6 w-full min-w-[70px] " />
                            </th>
                            <th className="py-3 px-6 text-center sticky top-0 bg-gray-200">
                                <Skeleton className="h-6 w-full min-w-[70px] " />
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {[...Array(4)].map((_, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-normal break-words max-w-xs">
                                    <Skeleton className="h-6 w-full min-w-[70px] " />
                                </td>
                                <td className="py-3 px-6 text-left whitespace-normal break-words max-w-xs">
                                    <Skeleton className="h-6 w-full min-w-[70px] " />
                                </td>
                                <td className="py-3 px-6 text-left whitespace-normal break-words max-w-xs">
                                    <Skeleton className="h-6 w-full min-w-[70px] " />
                                </td>
                                <td className="py-3 px-6 text-left whitespace-normal break-words max-w-xs">
                                    <Skeleton className="h-6 w-full min-w-[70px] " />
                                </td>
                                <td className="py-3 px-6 text-left whitespace-normal break-words max-w-xs">
                                    <Skeleton className="h-6 w-full min-w-[70px] " />
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <Skeleton className="h-6 w-full min-w-[70px] " />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export { ExpenseList, ExpenseListSkeleton };
