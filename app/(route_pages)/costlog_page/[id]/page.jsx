"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Header from "@/app/_components/header";
import { useRouter } from 'next/navigation';
import { db } from "@/utils/db_config";
import { eq, desc } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/my_schema";
import { use } from 'react';
import CostLog0 from "../page";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BudgetItem, BudgetItemSkeleton } from "./_components/budget_item_details";
import ExpenseForm from "./_components/expense_form";
import { ExpenseList, ExpenseListSkeleton } from "./_components/expense_list";
import { FaArrowLeft } from 'react-icons/fa';

function CostLog({ params }) {
  const unwrappedParams = use(params);
  const [budgetItem, setBudgetItem] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    budget_name: "",
    icon: "",
    amount: "",
    budget_ID: unwrappedParams.id,
    email: "",
    tags: "",
    notes: ""
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const router = useRouter();
  const editExpenseRef = useRef(null);

  const fetchBudgetItem = async () => {
    if (unwrappedParams.id !== '0') {
      try {
        console.log("Fetching budget item with ID:", unwrappedParams.id);
        const result = await db
          .select()
          .from(Budgets)
          .where(eq(Budgets.id, unwrappedParams.id));

        if (result.length > 0) {
          setBudgetItem(result[0]);
          setNewExpense(prevState => ({
            ...prevState,
            icon: result[0].icon
          }));
        } else {
          router.replace("/home_page");
        }
      } catch (error) {
        console.error("Error fetching budget item:", error);
        toast.error("Failed to fetch budget item. Please try again.", {
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
    }
  };

  const fetchExpenses = async () => {
    if (unwrappedParams.id !== '0') {
      try {
        console.log("Fetching expenses for budget ID:", unwrappedParams.id);
        const result = await db
          .select()
          .from(Expenses)
          .where(eq(Expenses.budget_ID, unwrappedParams.id))
          .orderBy(desc(Expenses.id));

        setExpenses(result);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        toast.error("Failed to fetch expenses. Please try again.", {
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
    }
  };

  useEffect(() => {
    fetchBudgetItem();
    fetchExpenses();
  }, [unwrappedParams.id, router]);

  useEffect(() => {
    if (budgetItem && expenses.length > 0) {
      const totalSpent = expenses.reduce((total, expense) => total + expense.amount, 0);
      const remainingAmount = Math.max(budgetItem.amount - totalSpent, 0);
      const progressPercentage = Math.min((totalSpent / budgetItem.amount) * 100, 100);

      setBudgetItem(prevBudgetItem => {
        if (
          prevBudgetItem.totalSpent !== totalSpent ||
          prevBudgetItem.remainingAmount !== remainingAmount ||
          prevBudgetItem.progressPercentage !== progressPercentage
        ) {
          return {
            ...prevBudgetItem,
            totalSpent,
            remainingAmount,
            progressPercentage
          };
        }
        return prevBudgetItem;
      });
    } else if (budgetItem) {
      setBudgetItem(prevBudgetItem => {
        if (
          prevBudgetItem.totalSpent !== 0 ||
          prevBudgetItem.remainingAmount !== budgetItem.amount ||
          prevBudgetItem.progressPercentage !== 0
        ) {
          return {
            ...prevBudgetItem,
            totalSpent: 0,
            remainingAmount: budgetItem.amount,
            progressPercentage: 0
          };
        }
        return prevBudgetItem;
      });
    }
  }, [budgetItem, expenses]);

  useEffect(() => {
    if (budgetItem && budgetItem.totalSpent > budgetItem.amount) {
      setWarningMessage("Total spent exceeds the total budget.");
    } else {
      setWarningMessage("");
    }
  }, [budgetItem]);

  const handleBudgetItemClick = useCallback(() => {
    router.push("/home_page");
  }, [router]);

  if (unwrappedParams.id === '0') {
    return (
      <div>
        <CostLog0 />
      </div>
    );
  }

  if (!budgetItem) {
    return (
      <div>
        <Header />
        <main className="p-4 md:p-10 bg-gray-50 min-h-screen flex flex-col">
          <BudgetItemSkeleton />
          <ExpenseListSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="p-4 md:p-10 bg-gray-50 min-h-screen flex flex-col">
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push("/home_page")}
            className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition duration-300 mr-4"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>
          <h1 className="text-3xl font-semibold text-gray-800">
            Budget Details
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <BudgetItem budgetItem={budgetItem} expenses={expenses} onClick={handleBudgetItemClick} warningMessage={warningMessage} />
          <ExpenseForm
            newExpense={newExpense}
            setNewExpense={setNewExpense}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            fetchExpenses={fetchExpenses}
            budgetItem={budgetItem}
            editExpenseRef={editExpenseRef}
            expenses={expenses}
          />
        </div>
        <ExpenseList
          expenses={expenses}
          setEditingExpense={setEditingExpense}
          setNewExpense={setNewExpense}
          fetchExpenses={fetchExpenses}
          editExpenseRef={editExpenseRef}
        />
      </main>
      <style jsx global>{`
        .Toastify__toast-container {
          width: 100%;
          max-width: 500px;
        }
        @media (max-width: 500px) {
          .Toastify__toast-container {
            width: 70%;
            max-width: 400px;
            right: 1;
            left: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default CostLog;
