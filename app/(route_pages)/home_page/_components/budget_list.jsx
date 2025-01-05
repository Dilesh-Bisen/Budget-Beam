import React, { useEffect, useState, useCallback } from 'react';
import CreateBudget from './create_budget';
import { db } from "@/utils/db_config";
import { eq, getTableColumns, sql, desc } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/my_schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from './budget_item';
import { Skeleton } from "@/components/ui/skeleton";

function BudgetList() {
    const { user } = useUser();
    const [budgetsList, setBudgetsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentlyEditing, setCurrentlyEditing] = useState(null);
    const [currentlyViewing, setCurrentlyViewing] = useState(null);

    const fetchBudgets = useCallback(async () => {
        if (user && user.primaryEmailAddress?.emailAddress) {
            try {
                const result = await db
                    .select({
                        ...getTableColumns(Budgets),
                        total_spend: sql`sum(${Expenses.amount})`.mapWith(Number),
                        total_items: sql`count(${Expenses.id})`.mapWith(Number)
                    })
                    .from(Budgets)
                    .leftJoin(Expenses, eq(Budgets.id, Expenses.budget_ID))
                    .where(eq(Budgets.email, user.primaryEmailAddress.emailAddress))
                    .groupBy(Budgets.id)
                    .orderBy(desc(Budgets.id));

                setBudgetsList(result);
            } catch (error) {
                console.error("Error fetching budgets:", error);
            } finally {
                setLoading(false);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchBudgets();
        const interval = setInterval(fetchBudgets, 2000); 
        return () => clearInterval(interval);
    }, [fetchBudgets]);

    const handleDelete = (id) => {
        setBudgetsList(budgetsList.filter(budget => budget.id !== id));
    };

    const handleUpdate = (updatedBudget) => {
        setBudgetsList(budgetsList.map(budget => budget.id === updatedBudget.id ? updatedBudget : budget));
    };

    const handleBudgetCreated = () => {
        fetchBudgets();
    };

    const handleEditStart = (id) => {
        setCurrentlyEditing(id);
        setCurrentlyViewing(null);
    };

    const handleEditEnd = () => {
        setCurrentlyEditing(null);
    };

    const handleViewDetails = (id) => {
        setCurrentlyViewing(id);
        setCurrentlyEditing(null);
    };

    return (
        <div>
            <CreateBudget onBudgetCreated={handleBudgetCreated} />
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Your Budgets</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Skeleton className="w-[40px] h-[40px] rounded-full" />
                                        <div className="ml-4">
                                            <Skeleton className="w-[100px] h-[20px] rounded-full" />
                                            <Skeleton className="w-[80px] h-[16px] rounded-full mt-2" />
                                        </div>
                                    </div>
                                    <Skeleton className="w-[80px] h-[24px] rounded-full" />
                                </div>
                                <div className="mt-5">
                                    <Skeleton className="w-full h-[8px] rounded-full" />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <Skeleton className="w-[60px] h-[20px] rounded-full" />
                                    <Skeleton className="w-[60px] h-[20px] rounded-full" />
                                    <Skeleton className="w-[80px] h-[20px] rounded-full" />
                                </div>
                            </div>
                        ))
                    ) : (
                        budgetsList.map((budget, index) => (
                            <BudgetItem
                                key={index}
                                budget={budget}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                                isEditing={currentlyEditing === budget.id}
                                onEditStart={() => handleEditStart(budget.id)}
                                onEditEnd={handleEditEnd}
                                isViewingDetails={currentlyViewing === budget.id}
                                onViewDetails={handleViewDetails}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default BudgetList;
