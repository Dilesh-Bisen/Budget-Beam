"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { usePathname } from "next/navigation";
import { FaHome, FaCalendarAlt, FaChartLine, FaFileAlt, FaHeadset } from "react-icons/fa";
import dynamic from 'next/dynamic';

const Profile = dynamic(() => import('./profile'), { ssr: false });

const Header = () => {
    const [menuState, setMenuState] = useState(false);
    const menu_ref = useRef(null);
    const button_ref = useRef(null);
    const path_name = usePathname();

    const navigation = useMemo(() => [
        { title: "Home", path: "/home_page", icon: <FaHome /> },
        { title: "CostLog", path: "/costlog_page/0", icon: <FaCalendarAlt /> },
        { title: "Insights", path: "/insights_page", icon: <FaChartLine /> },
        { title: "Reports", path: "/reports_page", icon: <FaFileAlt /> },
        { title: "Support", path: "/support_page", icon: <FaHeadset /> },
    ], []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menu_ref.current && !menu_ref.current.contains(event.target) &&
                button_ref.current && !button_ref.current.contains(event.target)
            ) {
                setMenuState(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = useCallback(() => {
        setMenuState(prevState => !prevState);
    }, []);

    const isActive = (path) => {
        if (path instanceof RegExp) {
            return path.test(path_name);
        }
        return path_name === path;
    };

    return (
        <nav className="bg-gray-800 border-b shadow-md">
            <div className="flex items-center space-x-6 py-2 px-4 max-w-screen-xl mx-auto md:px-8">
                <div className="flex-none lg:flex-initial">
                    <a href="/">
                        <img
                            src="/logo.webp"
                            width={70}
                            height={50}
                            alt="logo"
                        />
                    </a>
                </div>
                <div className="flex-1 flex items-center justify-between">

                    {/* Mobile Menu */}
                    <div
                        ref={menu_ref}
                        className={`lg:hidden bg-slate-300 absolute z-20 top-24 right-5 p-1 rounded-lg shadow-xl w-40 ${menuState ? "" : "hidden"}`}
                    >
                        <ul className="space-y-4 lg:flex lg:space-x-8 lg:space-y-0 lg:mt-0">
                            {navigation.map((item) => (
                                <li
                                    key={item.title}
                                    className={`text-black hover:text-black hover:font-bold transition-all duration-300 transform hover:scale-105 hover:text-primary hover:bg-blue-300 ${isActive(item.path) ? 'text-indigo-500 font-bold underline' : ''}`}
                                >
                                    <a href={item.path} className="py-2 px-4 rounded-md flex items-center">
                                        <span className="mr-2">{item.icon}</span>{item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center justify-between py-2 px-4 max-w-screen-xl mx-auto">
                        <ul className="flex space-x-6">
                            {navigation.map((item) => (
                                <li
                                    key={item.title}
                                    className={`text-gray-300 hover:text-white hover:font-bold hover:scale-105 transition-all duration-300 ${isActive(item.path) ? 'text-indigo-500 font-bold underline' : ''}`}
                                >
                                    <a href={item.path} className="py-2 px-2 flex items-center">
                                        <span className="mr-2">{item.icon}</span>{item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Search and Profile */}
                    <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-4">
                        <form className="flex items-center border border-gray-600 rounded-md p-1 w-full sm:w-64 md:w-72 lg:w-80">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 flex-none text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                className="w-full outline-none appearance-none placeholder-gray-500 text-gray-300 bg-transparent"
                                type="text"
                                placeholder="Search"
                            />
                        </form>
                        <Profile />
                        <button
                            ref={button_ref}
                            className="outline-none text-gray-400 block lg:hidden"
                            onClick={toggleMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
