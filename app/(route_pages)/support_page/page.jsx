"use client";

import React, { useState } from 'react';
import Header from "../../_components/header.jsx";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaQuestionCircle } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Support() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill out all fields.", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setFormData({
                name: '',
                email: '',
                message: ''
            });

            toast.success("Support request submitted successfully!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.error("Error submitting support request:", error);
            toast.error("Failed to submit support request. Please try again.", {
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
                <section className="hero-section bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-8 md:p-16 rounded-lg shadow-lg relative overflow-hidden">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Support</h1>
                    <p className="text-lg md:text-xl mb-6 relative z-10">We're here to help! Get support and answers to your questions.</p>
                </section>

                <section className="faq-section mt-8 p-4 md:p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="faq-item">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                                <FaQuestionCircle className="mr-2 text-orange-500" /> How do I create a new budget?
                            </h3>
                            <p className="text-base text-gray-600">To create a new budget, simply click on the "Create Budget" button and follow the prompts.</p>
                        </div>
                        <div className="faq-item">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                                <FaQuestionCircle className="mr-2 text-orange-500" /> Can I add multiple expenses to a budget?
                            </h3>
                            <p className="text-base text-gray-600">Yes, you can add multiple expenses to a budget to keep track of your spending.</p>
                        </div>
                        <div className="faq-item">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                                <FaQuestionCircle className="mr-2 text-orange-500" /> How do I view my budget reports?
                            </h3>
                            <p className="text-base text-gray-600">You can view your budget reports by navigating to the "Reports" section in the dashboard.</p>
                        </div>
                    </div>
                </section>

                <section className="contact-section mt-8 p-4 md:p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a href="mailto:3dileshbisen@gmail.com" className="contact-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 block">
                            <FaEnvelope className="text-orange-500 text-3xl mb-2" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                            <p className="text-base text-gray-600 hover:text-orange-500">3dileshbisen@gmail.com</p>
                        </a>
                        <a href="tel:+918767964378" className="contact-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 block">
                            <FaPhoneAlt className="text-orange-500 text-3xl mb-2" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
                            <p className="text-base text-gray-600 hover:text-orange-500">+918767964378</p>
                        </a>
                        <div className="contact-item p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
                            <FaMapMarkerAlt className="text-orange-500 text-3xl mb-2" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
                            <p className="text-base text-gray-600">New Gajanan Colony, Gondia, Maharashtra, India</p>
                        </div>
                    </div>
                </section>

                <section className="support-form-section mt-8 p-4 md:p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Support Form</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-gray-800 font-semibold mb-2 block">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 font-semibold mb-2 block">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 font-semibold mb-2 block">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Your Message"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-orange-600 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </section>
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

export default Support;
