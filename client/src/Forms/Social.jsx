import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { useAuth } from '../context/AuthContext'
const Social = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { user } = useAuth();

  const onSubmit = (data) => {

    setDoc(
      doc(db, 'users', user.uid),
      {
        social: data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    navigate('/view-resume');
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className="bg-[#2DC08D] w-full md:w-1/3 min-h-[200px] md:min-h-screen flex flex-col justify-center items-center py-10 md:py-0">
        <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
          <h1 className="text-4xl font-bold text-[#2DC08D]">08</h1>
        </div>
        <h1 className="text-2xl font-semibold text-white mt-4">Social</h1>
      </div>

      <div className="w-full md:w-2/3 flex justify-center py-10 px-6 md:px-12">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h1 className="text-4xl font-semibold text-[#2DC08D] text-center mb-8">Add Social Links</h1>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <input type="url" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]" placeholder="https://linkedin.com/in/username" {...register('linkedin')} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
              <input type="url" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]" placeholder="https://github.com/username" {...register('github')} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
              <input type="url" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]" placeholder="https://portfolio.example.com" {...register('portfolio')} />
            </div>

            <div className="flex pt-4">
              <button type="submit" className="w-full md:w-auto ml-auto bg-[#2DC08D] hover:bg-[#25a075] text-white px-8 py-3 rounded-md font-medium shadow-md transition">Finish</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Social;
