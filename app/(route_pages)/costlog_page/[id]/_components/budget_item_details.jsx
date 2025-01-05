"use client"

import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

function BudgetItem({ budgetItem, expenses, onClick, warningMessage }) {
  const totalSpend = budgetItem.totalSpent !== undefined ? budgetItem.totalSpent : 0;
  const remainingAmount = budgetItem.remainingAmount !== undefined ? budgetItem.remainingAmount : 0;
  const progressPercentage = budgetItem.progressPercentage !== undefined ? budgetItem.progressPercentage : 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[180px]" onClick={onClick}>
      <div className="flex items-center justify-between cursor-pointer">
        <div className="flex items-center">
          <div className="icon-circle bg-gray-200 p-2 rounded-full">
            <h2 className="text-xl font-semibold">{budgetItem.icon}</h2>
          </div>
          <div className="ml-4">
            <h2 className="text-base font-medium">{budgetItem.budget_name}</h2>
            <h2 className="text-sm text-gray-500">{expenses.length} items</h2>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-black">Rs.{budgetItem.amount}</h2>
      </div>
      <div className="mt-5">
        <div className="w-full bg-slate-200 h-2 rounded-full">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">Total Spent:</h3>
          <p className="text-gray-700">Rs.{totalSpend}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Remaining:</h3>
          <p className="text-gray-700">Rs.{remainingAmount}</p>
        </div>
      </div>
      {warningMessage && <p className="text-red-500 mt-4">{warningMessage}</p>}
    </div>
  );
}

function BudgetItemSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <div className="bg-white p-4 rounded-lg shadow-md h-[180px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="icon-circle bg-gray-200 p-2 rounded-full w-10 h-10">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="ml-4">
              <Skeleton className="h-4 w-8 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="mt-5">
          <Skeleton className="h-4 w-full mb-2" />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Skeleton className="h-8 w-full mb-4" />
        <div className="mb-4">
          <Skeleton className="h-6 w-28 mb-2" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-6 w-28 mb-2" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export { BudgetItem, BudgetItemSkeleton };
