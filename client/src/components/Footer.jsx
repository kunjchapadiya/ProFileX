import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 print:hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-[#2DC08D] mb-4">
                            ProFileX
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering professionals to advance their careers with cutting-edge resume building tools and ATS-friendly templates.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Product</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link to="/template-selection" className="hover:text-[#2DC08D] transition">Templates</Link></li>
                            <li><Link to="/about" className="hover:text-[#2DC08D] transition">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-[#2DC08D] transition">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-[#2DC08D] transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[#2DC08D] transition">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-[#2DC08D] transition">Cookie Policy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest career tips.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-[#2DC08D]"
                            />
                            <button className="bg-[#2DC08D] px-4 py-2 rounded-r-md hover:bg-[#25a075] transition">
                                →
                            </button>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} ProFileX. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {/* Social Placeholders */}
                        <a href="#" className="hover:text-white transition">Twitter</a>
                        <a href="#" className="hover:text-white transition">LinkedIn</a>
                        <a href="#" className="hover:text-white transition">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
