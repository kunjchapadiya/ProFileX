import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="bg-[#2DC08D] text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About ProFileX</h1>
                <p className="text-xl max-w-2xl mx-auto">
                    We empower professionals to land their dream jobs with ATS-friendly, beautiful resumes.
                </p>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-6 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
                        <p className="text-lg leading-relaxed text-gray-600 mb-6">
                            At ProFileX, we believe that every career story deserves to be told perfectly.
                            Our mission is to simplify the resume creation process, removing the stress of
                            formatting and design so you can focus on what matters most: your skills and experience.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Whether you're a fresh graduate or a seasoned executive, our tools are designed
                            to give you the competitive edge in today's job market.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-[#2DC08D]">
                        <h3 className="text-xl font-semibold mb-4 text-[#2DC08D]">Why ProFileX?</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="mr-2 text-[#2DC08D]">✓</span>
                                <span>ATS-Optimized Templates</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-[#2DC08D]">✓</span>
                                <span>Real-time Preview</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-[#2DC08D]">✓</span>
                                <span>Expert Tips & Guidance</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-[#2DC08D]">✓</span>
                                <span>Secure Data Protection</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Stats/Team placeholder */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-10 text-gray-900">Trusted by Professionals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <div className="text-4xl font-bold text-[#2DC08D] mb-2">10k+</div>
                            <div className="text-gray-600">Resumes Created</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-[#2DC08D] mb-2">50+</div>
                            <div className="text-gray-600">Templates</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-[#2DC08D] mb-2">95%</div>
                            <div className="text-gray-600">Interview Success Rate</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
