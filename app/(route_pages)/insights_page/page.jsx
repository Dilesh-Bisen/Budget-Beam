"use client";

import React, { useEffect, useState } from 'react';
import Header from "../../_components/header.jsx";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { db } from "@/utils/db_config";
import { Budgets, Expenses } from "@/utils/my_schema";
import { useUser } from "@clerk/nextjs";
import { eq, sql, desc } from "drizzle-orm";
import { FaChartBar, FaMoneyBillWave, FaPiggyBank, FaCogs } from 'react-icons/fa';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Insight() {
    const { user } = useUser();
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Expenses',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Budget',
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            if (user && user.primaryEmailAddress?.emailAddress) {
                try {
                    const budgetResult = await db
                        .select({
                            month: sql`TO_CHAR(created_at, 'Month')`.as('month'),
                            total_budget: sql`SUM(amount)`.as('total_budget'),
                        })
                        .from(Budgets)
                        .where(eq(Budgets.email, user.primaryEmailAddress.emailAddress))
                        .groupBy(sql`TO_CHAR(created_at, 'Month')`)
                        .orderBy(desc(sql`TO_CHAR(created_at, 'Month')`));

                    const expenseResult = await db
                        .select({
                            month: sql`TO_CHAR(created_at, 'Month')`.as('month'),
                            total_expenses: sql`SUM(amount)`.as('total_expenses'),
                        })
                        .from(Expenses)
                        .where(eq(Expenses.email, user.primaryEmailAddress.emailAddress))
                        .groupBy(sql`TO_CHAR(created_at, 'Month')`)
                        .orderBy(desc(sql`TO_CHAR(created_at, 'Month')`));

                    const labels = [...new Set([...budgetResult.map(item => item.month), ...expenseResult.map(item => item.month)])];
                    const budgetData = labels.map(label => budgetResult.find(item => item.month === label)?.total_budget || 0);
                    const expenseData = labels.map(label => expenseResult.find(item => item.month === label)?.total_expenses || 0);

                    setChartData({
                        labels,
                        datasets: [
                            {
                                label: 'Expenses',
                                data: expenseData,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            },
                            {
                                label: 'Budget',
                                data: budgetData,
                                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            },
                        ],
                    });
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, [user]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Budget vs Expenses',
            },
        },
    };

    return (
        <div>
            <Header />
            <main className="p-4 md:p-10 bg-gray-50 min-h-screen">
                <section className="hero-section bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 md:p-16 rounded-lg shadow-lg relative overflow-hidden mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Insights</h1>
                    <p className="text-lg md:text-xl mb-6 relative z-10">Gain valuable insights into your financial habits with our detailed reports and charts.</p>
                </section>

                <section className="insights-section p-4 md:p-8 bg-white rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="insight-item p-6 bg-gray-100 rounded-lg shadow-sm flex items-center">
                            <FaChartBar className="text-4xl text-blue-500 mr-4" />
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Total Spending</h3>
                                <p className="text-base text-gray-600">Track your total spending over time to understand your financial habits.</p>
                            </div>
                        </div>
                        <div className="insight-item p-6 bg-gray-100 rounded-lg shadow-sm flex items-center">
                            <FaMoneyBillWave className="text-4xl text-green-500 mr-4" />
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Budget Adherence</h3>
                                <p className="text-base text-gray-600">See how well you are sticking to your budget and identify areas for improvement.</p>
                            </div>
                        </div>
                        <div className="insight-item p-6 bg-gray-100 rounded-lg shadow-sm flex items-center">
                            <FaPiggyBank className="text-4xl text-yellow-500 mr-4" />
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Expense Categories</h3>
                                <p className="text-base text-gray-600">Analyze your spending across different categories to make informed decisions.</p>
                            </div>
                        </div>
                        <div className="insight-item p-6 bg-gray-100 rounded-lg shadow-sm flex items-center">
                            <FaCogs className="text-4xl text-red-500 mr-4" />
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Savings Trends</h3>
                                <p className="text-base text-gray-600">Monitor your savings trends over time to plan for future financial goals.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="charts-section p-4 md:p-8 bg-white rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Charts</h2>
                    <div className="chart-container">
                        <Bar data={chartData} options={options} />
                    </div>
                </section>

                <section className="additional-insights p-4 md:p-8 bg-white rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="insight-item p-6 bg-gray-100 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Top Expense Categories</h3>
                            <p className="text-base text-gray-600">Identify the categories where you spend the most.</p>
                        </div>
                        <div className="insight-item p-6 bg-gray-100 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Monthly Savings</h3>
                            <p className="text-base text-gray-600">Track your savings month by month.</p>
                        </div>
                        <div className="insight-item p-6 bg-gray-100 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Budget vs Actual</h3>
                            <p className="text-base text-gray-600">Compare your budgeted amounts with actual spending.</p>
                        </div>
                        <div className="insight-item p-6 bg-gray-100 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Expense Trends</h3>
                            <p className="text-base text-gray-600">Analyze trends in your spending patterns.</p>
                        </div>
                    </div>
                </section>

                <section className="cta-section p-4 md:p-8 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg text-center mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Unlock Your Financial Potential</h2>
                    <p className="text-base text-gray-200 mb-6">Take the first step towards financial freedom. Start managing your budget and expenses with our intuitive tools.</p>
                    <a href="/home_page" className="bg-white text-green-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300">
                        Get Started Today
                    </a>
                </section>
            </main>
        </div>
    );
}

export default Insight;
