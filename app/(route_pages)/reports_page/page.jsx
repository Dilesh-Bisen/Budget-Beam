"use client";

import React, { useEffect, useState } from 'react';
import Header from "../../_components/header.jsx";
import { FaFileAlt, FaChartBar, FaCogs, FaDownload } from 'react-icons/fa';
import { db } from "@/utils/db_config";
import { Budgets, Expenses } from "@/utils/my_schema";
import { eq, desc, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {
    const { user } = useUser();
    const [budgetItems, setBudgetItems] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const budgetResult = await db
                    .select({
                        id: Budgets.id,
                        budget_name: Budgets.budget_name,
                        icon: Budgets.icon,
                        amount: Budgets.amount,
                        email: Budgets.email,
                        total_spend: sql`sum(${Expenses.amount})`.mapWith(Number),
                        total_items: sql`count(${Expenses.id})`.mapWith(Number)
                    })
                    .from(Budgets)
                    .leftJoin(Expenses, eq(Budgets.id, Expenses.budget_ID))
                    .where(eq(Budgets.email, user?.primaryEmailAddress?.emailAddress))
                    .groupBy(Budgets.id)
                    .orderBy(desc(Budgets.id));

                const expenseResult = await db
                    .select()
                    .from(Expenses)
                    .where(eq(Expenses.email, user?.primaryEmailAddress?.emailAddress))
                    .orderBy(desc(Expenses.id));

                setBudgetItems(budgetResult);
                setExpenses(expenseResult);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data. Please try again.", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const downloadReports = () => {
        const doc = new jsPDF();
        doc.text("Financial Reports", 14, 22);

        const budgetTableColumns = ["Budget Name", "Amount", "Total Spend", "Total Items"];
        const budgetTableRows = budgetItems.map(item => [
            item.budget_name,
            item.amount,
            item.total_spend,
            item.total_items
        ]);
        autoTable(doc, {
            head: [budgetTableColumns],
            body: budgetTableRows,
            startY: 30
        });

        const expenseTableColumns = ["Budget Name", "Amount", "Tags", "Notes"];
        const expenseTableRows = expenses.map(item => [
            item.budget_name,
            item.amount,
            item.tags,
            item.notes
        ]);
        autoTable(doc, {
            head: [expenseTableColumns],
            body: expenseTableRows,
            startY: doc.autoTable.previous.finalY + 10
        });

        doc.save("financial_reports.pdf");
    };

    return (
        <div>
            <Header />
            <main className="p-4 md:p-10 bg-gray-50 min-h-screen">
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <section className="hero-section bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-8 md:p-16 rounded-lg shadow-lg relative overflow-hidden">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Reports</h1>
                    <p className="text-lg md:text-xl mb-6 relative z-10">Get detailed and comprehensive reports on your financial activities. Stay informed and make better financial decisions.</p>
                </section>

                <section className="summary-section mt-8 p-4 md:p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Report Summaries</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="summary-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                            <FaFileAlt className="text-teal-500 text-3xl mb-2" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Monthly Report</h3>
                            <p className="text-base text-gray-600">Get a monthly overview of your financial activities and spending patterns.</p>
                        </div>
                        <div className="summary-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                            <FaChartBar className="text-teal-500 text-3xl mb-2" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quarterly Report</h3>
                            <p className="text-base text-gray-600">Analyze your financial performance over the last quarter with detailed insights.</p>
                        </div>
                        <div className="summary-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                            <FaCogs className="text-teal-500 text-3xl mb-2" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Annual Report</h3>
                            <p className="text-base text-gray-600">Review your annual financial activities and plan for the future with comprehensive reports.</p>
                        </div>
                    </div>
                </section>

                <section className="detailed-reports-section mt-8 p-4 md:p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detailed Reports</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="report-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Expense Analysis</h3>
                            <p className="text-base text-gray-600">Dive deep into your expense patterns and identify areas for improvement.</p>
                        </div>
                        <div className="report-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Budget Performance</h3>
                            <p className="text-base text-gray-600">Evaluate how well you are sticking to your budget and make necessary adjustments.</p>
                        </div>
                        <div className="report-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Income Trends</h3>
                            <p className="text-base text-gray-600">Monitor your income trends over time to plan for future financial goals.</p>
                        </div>
                        <div className="report-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Savings Growth</h3>
                            <p className="text-base text-gray-600">Track your savings growth and ensure you are on track to meet your financial objectives.</p>
                        </div>
                    </div>
                </section>

                <section className="cta-section mt-8 p-4 md:p-8 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">Download Your Reports</h2>
                    <p className="text-base text-gray-200 mb-6">Get your financial reports in PDF format for easy sharing and record-keeping.</p>
                    <div className="flex justify-center">
                        <button
                            onClick={downloadReports}
                            className="bg-white text-teal-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300 flex items-center"
                        >
                            <FaDownload className="mr-2" />
                            Download Reports
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Reports;
