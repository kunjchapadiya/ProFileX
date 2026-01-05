import React from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateSelection = () => {
    const navigate = useNavigate();

    const templates = [
        { id: 'temp1', name: 'Standard', color: 'bg-white', border: 'border-gray-200', image: '/template/temp 1.png' },
        { id: 'temp2', name: 'Professional', color: 'bg-blue-50', border: 'border-blue-900', image: '/template/temp 2.png' },
        { id: 'temp3', name: 'Modern', color: 'bg-slate-900', border: 'border-slate-800', image: '/template/temp 3.png' },
        { id: 'temp4', name: 'Minimalist', color: 'bg-white', border: 'border-black', image: '/template/temp 4.png' },
        { id: 'temp5', name: 'Creative', color: 'bg-white', border: 'border-teal-500', image: '/template/temp 5.png' },
        { id: 'temp6', name: 'Executive', color: 'bg-[#FFFEF2]', border: 'border-black', image: '/template/temp 6.png' },
    ];

    const handleSelect = (id) => {
        localStorage.setItem('selectedTemplate', id);
        navigate('/personal-info');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
                    Choose Your Resume Template
                </h1>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Select a template that best fits your style. You can change this later!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => handleSelect(template.id)}
                            className={`relative group cursor-pointer border-4 ${template.border} rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl h-[500px] bg-white`}
                        >
                            {/* Template Preview Image */}
                            <div className="h-full w-full overflow-hidden bg-gray-200">
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>

                            {/* Overlay Label */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center transform translate-y-full group-hover:translate-y-0 transition-transform">
                                <span className="font-bold text-lg">{template.name}</span>
                                <p className="text-xs text-gray-300">Click to Select</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateSelection;
