"use client";

import React from 'react';

function Banner() {
    return (
        <div className='-mb-10'>
            <section className="bg-gradient-to-b from-blue-900 to-gray-900 text-white">
                <div className="mx-auto max-w-screen-xl px-6 py-24 lg:flex lg:items-center">
                    <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left">
                        <h1
                            className="text-3xl md:text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                        >
                            Manage Your Money Smartly
                        </h1>

                        <p className="mt-6 text-sm md:text-base lg:text-lg leading-relaxed text-gray-300">
                            Effortlessly manage your money with Budget Beam. Track expenses, set goals, and find financial peace.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                            <a
                                className="rounded-lg bg-blue-600 px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-medium text-white shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                href="/home_page"
                            >
                                Get Started
                            </a>
                            <a
                                className="rounded-lg border border-gray-600 px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-medium text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                                href="#"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>

                    <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
                        <div className="relative overflow-hidden rounded-lg shadow-lg w-full max-w-xl">
                            <img
                                src="banner.jpg"
                                alt="Expense Tracker"
                                className="w-full h-full object-cover object-center transition-transform transform hover:scale-105"
                                style={{ maxHeight: '360px', minHeight: '300px' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-700 via-transparent to-transparent rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features-section p-4 md:p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="feature-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-105">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Budget Tracking</h3>
                        <p className="text-base text-gray-600">Easily create and manage multiple budgets to keep your finances organized.</p>
                    </div>
                    <div className="feature-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-105">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Expense Logging</h3>
                        <p className="text-base text-gray-600">Log your expenses with just a few clicks and stay on top of your spending.</p>
                    </div>
                    <div className="feature-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-105">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Insights and Reports</h3>
                        <p className="text-base text-gray-600">Get detailed insights and reports to understand your financial habits better.</p>
                    </div>
                    <div className="feature-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 transform hover:scale-105">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">User-Friendly Interface</h3>
                        <p className="text-base text-gray-600">Our intuitive and user-friendly interface makes managing your finances a breeze.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Banner;
