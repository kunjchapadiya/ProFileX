import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';


const Languages = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: { languages: [{ name: '', level: 'Intermediate' }] }
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'languages' });
  const navigate = useNavigate();
  const { user } = useAuth();

  const onSubmit = async (data) => {

    if (!user) {
      alert('Please log in to save language information');
      return;
    }
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          languages: data.languages,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
    catch (error) {
      console.error('Failed to save language info', error);
    }

    navigate('/social');
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className="bg-[#2DC08D] w-full md:w-1/3 min-h-[200px] md:min-h-screen flex flex-col justify-center items-center py-10 md:py-0">
        <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
          <h1 className="text-4xl font-bold text-[#2DC08D]">07</h1>
        </div>
        <h1 className="text-2xl font-semibold text-white mt-4">Languages</h1>
      </div>

      <div className="w-full md:w-2/3 flex justify-center py-10 px-6 md:px-12">
        <form className="w-full max-w-xl space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-4xl font-semibold text-[#2DC08D] text-center mb-8">Add Languages</h1>

          {fields.map((field, index) => (
            <div key={field.id} className="border p-6 rounded-lg shadow-sm bg-white space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">Language {index + 1}</h3>
                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(index)} className="text-red-600 text-sm hover:text-red-800">Remove</button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:hidden">Language</label>
                  <input className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]" placeholder="Language (e.g. English)" {...register(`languages.${index}.name`, { required: true })} />
                </div>
                <div className="w-full sm:w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:hidden">Level</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]" {...register(`languages.${index}.level`)}>
                    <option>Basic</option>
                    <option>Intermediate</option>
                    <option>Fluent</option>
                    <option>Native</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button type="button" onClick={() => append({ name: '', level: 'Intermediate' })} className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition">Add another</button>
            <button type="submit" className="sm:ml-auto bg-[#2DC08D] hover:bg-[#25a075] text-white px-8 py-3 rounded-md font-medium shadow-md transition">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Languages;
