import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <div>
            <footer className="bg-teal-700 text-white py-3 shadow-lg mt-10">
                <div className="container mx-auto text-center">

                    <p className="text-sm sm:text-base mb-2">&copy; {new Date().getFullYear()} Budget-Beam. All rights reserved.</p>
                    <p className="text-xs sm:text-sm mb-2">
                        <a href="#" className="hover:text-teal-300 transition duration-300">Privacy Policy</a> |
                        <a href="#" className="hover:text-teal-300 transition duration-300"> Terms of Service</a>
                    </p>

                    <div className="flex justify-center space-x-8 mt-2">
                        <a href="https://x.com/DileshBisen9" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100086452235851" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://www.instagram.com/dilesh__bisen2003/" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110">
                            <FaInstagram size={24} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
