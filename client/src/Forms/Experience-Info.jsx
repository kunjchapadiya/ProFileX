import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const ExperienceInfo = () => {
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            experience: [
                { company: '', role: '', city: '', from: '', to: '', description: '' }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'experience'
    });

    const navigate = useNavigate();
    const { user } = useAuth();

    const onSubmit = async (data) => {
        if (!user) {
            alert('Please log in to save experience information');
            return;
        }
        try {
            await setDoc(
                doc(db, 'users', user.uid),
                {
                    experience: data.experience,
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            );
            navigate('/skills');
        }
        catch (error) {
            console.error('Failed to save experience info', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">

            {/* LEFT */}
            <div className="left bg-[#2DC08D] w-full md:w-1/3 min-h-[200px] md:min-h-screen flex flex-col justify-center items-center py-10 md:py-0">
                <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
                    <h1 className="text-4xl font-bold text-[#2DC08D]">03</h1>
                </div>

                <h1 className="text-3xl font-semibold text-white mt-4">
                    Experience Details
                </h1>
            </div>

            {/* RIGHT */}
            <div className="right w-full md:w-2/3 flex justify-center py-10 px-6 md:px-12">
                <form
                    className="w-full max-w-2xl space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="text-4xl font-semibold text-[#2DC08D] text-center mb-8">
                        Add Your Experience Details
                    </h1>

                    {fields.map((field, index) => (
                        <div key={field.id} className="border p-6 rounded-lg shadow-sm bg-white space-y-4">

                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-lg">
                                    Experience {index + 1}
                                </h3>
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-600 text-sm hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Company */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Google"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]"
                                        {...register(`experience.${index}.company`, { required: true })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role / Position
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Frontend Developer"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]"
                                        {...register(`experience.${index}.role`, { required: true })}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Ahmedabad"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]"
                                        {...register(`experience.${index}.city`, { required: true })}
                                    />
                                </div>

                                {/* From - To */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Duration (From - To)
                                    </label>
                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <input
                                                type="month"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]"
                                                {...register(`experience.${index}.from`, { required: true })}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <input
                                                type="month"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]"
                                                {...register(`experience.${index}.to`)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        rows="3"
                                        placeholder="Describe your responsibilities and achievements"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2DC08D]"
                                        {...register(`experience.${index}.description`, { required: true })}
                                    />
                                </div>
                            </div>

                        </div>
                    ))}

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() =>
                                append({
                                    company: '',
                                    role: '',
                                    city: '',
                                    from: '',
                                    to: '',
                                    description: ''
                                })
                            }
                            className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition"
                        >
                            + Add Another
                        </button>

                        <button
                            type="submit"
                            className="sm:ml-auto bg-[#2DC08D] hover:bg-[#25a075] text-white px-8 py-3 rounded-md font-medium shadow-md transition"
                        >
                            Next Step
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExperienceInfo;

