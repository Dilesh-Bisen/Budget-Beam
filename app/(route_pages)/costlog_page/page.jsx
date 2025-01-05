"use client"
import Header from '@/app/_components/header';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

function CostLog0() {
    return (
        <div>
            <Header />
            <main className="p-4 md:p-10 bg-gray-50 min-h-screen">
                <section className="hero-section bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 md:p-16 rounded-lg shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 animate-pulse"></div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Welcome to CostLog</h1>
                    <p className="text-lg md:text-xl mb-6 relative z-10 animate-pulse">Manage your budgets and expenses effortlessly. Stay on top of your finances with our intuitive tools.</p>
                    <a href="/home_page" className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300 relative z-10 shadow-md">
                        Get Started
                    </a>
                </section>

                <section className="description-section mt-8 p-4 md:p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
                    <p className="text-base text-gray-600 mb-6">
                        CostLog helps you track your expenses and manage your budgets efficiently. Here’s how you can get started:
                    </p>
                    <ol className="list-decimal list-inside text-gray-700">
                        <li className="mb-2 flex items-center">
                            <span className="mr-2 text-blue-500">🔑</span> Create a new budget by clicking on the "Create Budget" button.
                        </li>
                        <li className="mb-2 flex items-center">
                            <span className="mr-2 text-blue-500">💸</span> Add expenses to your budget to keep track of your spending.
                        </li>
                        <li className="mb-2 flex items-center">
                            <span className="mr-2 text-blue-500">📊</span> View detailed reports and insights to understand your financial habits better.
                        </li>
                    </ol>
                </section>


                <section className="steps-section mt-8 p-4 md:p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Steps to Use CostLog</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="step-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-105">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 1: Sign Up</h3>
                            <p className="text-base text-gray-600">Create an account to start managing your budgets and expenses.</p>
                        </div>
                        <div className="step-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-105">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 2: Create a Budget</h3>
                            <p className="text-base text-gray-600">Set up your budget by specifying the amount and category.</p>
                        </div>
                        <div className="step-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-105">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 3: Add Expenses</h3>
                            <p className="text-base text-gray-600">Log your expenses under the respective budget to track your spending.</p>
                        </div>
                        <div className="step-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-105">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 4: Monitor Your Budget</h3>
                            <p className="text-base text-gray-600">Keep an eye on your budget to ensure you stay within your limits.</p>
                        </div>
                        <div className="step-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-105">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 5: View Reports</h3>
                            <p className="text-base text-gray-600">Generate reports to get insights into your spending habits and make informed decisions.</p>
                        </div>
                        <div className="step-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-105">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 6: Adjust Your Budget</h3>
                            <p className="text-base text-gray-600">Make adjustments to your budget as needed based on your spending patterns.</p>
                        </div>
                    </div>
                </section>

                <section className="testimonials-section mt-8 p-4 md:p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="testimonial-item p-4 bg-gray-100 rounded-lg shadow-sm transform hover:scale-105 transition duration-300">
                            <FaQuoteLeft className="text-blue-500 text-2xl mb-2" />
                            <p className="text-base text-gray-600 mb-4">"Budget-Beam has completely transformed the way I manage my finances. It's so easy to use and keeps me on track with my budgets."</p>
                            <FaQuoteRight className="text-blue-500 text-2xl mb-2" />
                            <p className="text-base text-gray-800 font-semibold">- Jane Doe</p>
                        </div>
                        <div className="testimonial-item p-4 bg-gray-100 rounded-lg shadow-sm transform hover:scale-105 transition duration-300">
                            <FaQuoteLeft className="text-blue-500 text-2xl mb-2" />
                            <p className="text-base text-gray-600 mb-4">"I've tried many budgeting tools, but Budget-Beam is by far the best. The insights and reports are incredibly helpful."</p>
                            <FaQuoteRight className="text-blue-500 text-2xl mb-2" />
                            <p className="text-base text-gray-800 font-semibold">- John Smith</p>
                        </div>
                    </div>
                </section>

                <section className="cta-section mt-8 p-4 md:p-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">Ready to Take Control of Your Finances?</h2>
                    <a href="/home_page" className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300">
                        Start Managing Your Budget
                    </a>
                </section>
            </main>
        </div>
    );
}

export default CostLog0;
