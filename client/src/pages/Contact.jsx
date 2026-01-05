import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle form submission logic
        alert('Message sent! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl max-w-2xl mx-auto text-gray-300">
                    Have questions? We're here to help you build your perfect career path.
                </p>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-12 bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Contact Info */}
                    <div className="bg-[#2DC08D] p-10 text-white flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                            <p className="mb-8 text-white/90">
                                Fill up the form and our team will get back to you within 24 hours.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl">📧</span>
                                    <span>support@profilex.com</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl">📞</span>
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl">📍</span>
                                    <span>123 Career Blvd, Tech City</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <div className="flex space-x-4">
                                {/* Social placeholders */}
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition">X</div>
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition">in</div>
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition">f</div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#2DC08D] focus:border-[#2DC08D] outline-none transition"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#2DC08D] focus:border-[#2DC08D] outline-none transition"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#2DC08D] focus:border-[#2DC08D] outline-none transition"
                                    placeholder="How can we help you?"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#2DC08D] hover:bg-[#25a075] text-white font-bold py-3 rounded-lg transition duration-300 shadow-md"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
