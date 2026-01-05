import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useResumeData from '../hooks/useResumeData';
import Temp1 from '../Templates/Temp1';
import Temp2 from '../Templates/Temp2';
import Temp3 from '../Templates/Temp3';
import Temp4 from '../Templates/Temp4';
import Temp5 from '../Templates/Temp5';
import Temp6 from '../Templates/Temp6';

const ViewResume = () => {
    const navigate = useNavigate();
    const [selectedTemplate] = useState(localStorage.getItem('selectedTemplate') || 'temp1');
    const { resumeData, loading } = useResumeData();

    const renderTemplate = () => {
        switch (selectedTemplate) {
            case 'temp2': return <Temp2 />;
            case 'temp3': return <Temp3 />;
            case 'temp4': return <Temp4 />;
            case 'temp5': return <Temp5 />;
            case 'temp6': return <Temp6 />;
            default: return <Temp1 data={resumeData} />;
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6 no-print">
                    <h1 className="text-3xl font-bold text-gray-900">Your Resume</h1>
                    <div className="flex gap-4">
                        {/* Download PDF Button (specific for Temp1 for now) */}
                        <button
                            onClick={() => window.print()}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
                        >
                            Print / Save PDF
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow-2xl overflow-hidden print:shadow-none">
                    {renderTemplate()}
                </div>

                <div className="mt-8 text-center text-gray-500 text-sm no-print">
                    <p>Tip: Use browser print format options (Ctrl+P) to save as PDF. Ensure "Background Graphics" is checked.</p>
                </div>
            </div>

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    @page { margin: 0; }
                    
                    /* Ensure background colors are printed */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ViewResume;
