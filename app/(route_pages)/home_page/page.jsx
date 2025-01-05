"use client";

import React, { useEffect } from "react";
import Header from "../../_components/header.jsx";
import { db } from "@/utils/db_config.jsx";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { Budgets } from "@/utils/my_schema.jsx";
import { useRouter } from "next/navigation.js";
import BudgetList from "./_components/budget_list.jsx";

function HomePage() {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            check_user_expense();
        }
    }, [user]);

    const check_user_expense = async () => {
        const result = await db
            .select()
            .from(Budgets)
            .where(eq(Budgets.email, user?.primaryEmailAddress?.emailAddress));

        if (result?.length === 0) {
            router.replace("/home_page");
        }
    };

    return (
        <div>
            <Header />
            <main className="p-4 md:p-10 bg-gray-50 min-h-screen">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                            Your Finances, Simplified
                        </h1>
                        <p className="text-base text-gray-600">
                            Organize, budget, and take charge of your expenses with ease.
                        </p>
                    </div>
                    <a
                        href="/insights_page"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 w-44 md:w-auto text-center"
                    >
                        View Insights
                    </a>
                </div>
                <BudgetList />
            </main>
        </div>
    );
}

export default HomePage;
