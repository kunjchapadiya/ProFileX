import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const EducationInfo = () => {

    const { user } = useAuth();
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { education: [{ course: '', institution: '', city: '', passedOutMonth: '', passedOutYear: '' }] }
    });
    const navigate = useNavigate();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'education'
    });

    const onSubmit = async (data) => {
        console.log('Education submit', data, user)

        if (!user) {
            alert('Please log in to save education information')
            return;
        }

        try {
            await setDoc(
                doc(db, 'users', user.uid),
                {
                    education: data.education,
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            );
        } catch (error) {
            console.error('Failed to save education info', error);
        }
        navigate('/experience-info');
    };

    return (
        <>
            <div className="main flex flex-col md:flex-row w-full min-h-screen">
                <div className="left bg-[#2DC08D] w-full md:w-1/3 min-h-[200px] md:min-h-screen flex flex-col justify-center items-center py-10 md:py-0">
                    <div className="round w-20 h-20 bg-white rounded-full flex justify-center items-center">

                        <h1 className='text-4xl font-bold text-[#2DC08D]'>02</h1>
                    </div>
                    <br />
                    <h1 className='text-3xl font-semibold text-white'>Education Information</h1>
                </div>
                <div className="right flex flex-col justify-center items-center w-full md:w-2/3 p-6 md:p-12">
                    <h1 className='text-4xl font-semibold text-[#2DC08D] mb-8 text-center'>Education Information</h1>

                    <form action="post" className='flex flex-col w-full max-w-2xl space-y-6' onSubmit={handleSubmit(onSubmit)}>
                        {fields.map((field, index) => (
                            <div key={field.id} className="education-item border p-6 rounded-lg shadow-sm bg-white w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className='font-semibold text-lg'>Education {index + 1}</h3>
                                    {fields.length > 1 && (
                                        <button type='button' className='text-sm text-red-600 hover:text-red-800' onClick={() => remove(index)}>Remove</button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="inputbox flex flex-col">
                                        <label htmlFor={`education.${index}.course`} className='text-sm font-medium text-gray-700 mb-1'>Course / Degree</label>
                                        <input id={`education.${index}.course`} type="text" placeholder='e.g. B.Tech, MBA' className='border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#2DC08D] outline-none' {...register(`education.${index}.course`, { required: true })} />
                                        {errors.education && errors.education[index] && errors.education[index].course && <span className='text-red-500 text-xs mt-1'>Required</span>}
                                    </div>

                                    <div className="inputbox flex flex-col">
                                        <label htmlFor={`education.${index}.institution`} className='text-sm font-medium text-gray-700 mb-1'>University / College</label>
                                        <input id={`education.${index}.institution`} type="text" placeholder='Enter institution name' className='border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#2DC08D] outline-none' {...register(`education.${index}.institution`, { required: true })} />
                                        {errors.education && errors.education[index] && errors.education[index].institution && <span className='text-red-500 text-xs mt-1'>Required</span>}
                                    </div>

                                    <div className="inputbox flex flex-col md:col-span-2">
                                        <label htmlFor={`education.${index}.city`} className='text-sm font-medium text-gray-700 mb-1'>City</label>
                                        <input id={`education.${index}.city`} type="text" placeholder='Enter city' className='border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#2DC08D] outline-none' {...register(`education.${index}.city`, { required: true })} />
                                        {errors.education && errors.education[index] && errors.education[index].city && <span className='text-red-500 text-xs mt-1'>Required</span>}
                                    </div>

                                    <div className="inputbox flex flex-col md:col-span-2">
                                        <label className='text-sm font-medium text-gray-700 mb-1'>Passed Out</label>
                                        <div className="flex gap-4">
                                            <input type='month' className='border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-[#2DC08D] outline-none' {...register(`education.${index}.passedOutMonth`, { required: true })} />
                                            {/* Removed redundant year field if month/year picker covers it, or kept if needed. The original code had separate logic but only one input visible? 
                                            Wait, original had:
                                            <div className="flex gap-3 mt-2">
                                                <input type='month' ...>
                                                </input>
                                            </div>
                                            It seems only one input is used for month/year.
                                        */}
                                        </div>
                                        <div className='mt-1'>
                                            {errors.education && errors.education[index] && errors.education[index].passedOutMonth && <span className='text-red-500 text-xs'>Date is required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className='flex flex-col sm:flex-row gap-3 pt-4'>
                            <button type='button' className='bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition' onClick={() => append({ course: '', institution: '', city: '', passedOutMonth: '', passedOutYear: '' })}>+ Add Another</button>
                            <button className='sm:ml-auto bg-[#2DC08D] hover:bg-[#25a075] text-white px-8 py-3 rounded-md font-medium text-lg shadow-md transition' type='submit' >Next Step</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EducationInfo