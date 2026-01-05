import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Certification = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { certifications: [{ title: '', issuer: '', year: '', link: '' }] }
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'certifications' });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Certifications:', data.certifications);
    navigate('/projects');
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className="bg-[#2DC08D] w-full md:w-1/3 min-h-[200px] md:min-h-screen flex flex-col justify-center items-center py-10 md:py-0">
        <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
          <h1 className="text-4xl font-bold text-[#2DC08D]">05</h1>
        </div>
        <h1 className="text-2xl font-semibold text-white mt-4">Certifications</h1>
      </div>

      <div className="w-full md:w-2/3 flex justify-center py-10 px-6 md:px-12">
        <form className="w-full max-w-xl space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-4xl font-semibold text-[#2DC08D] text-center mb-8">Add Certifications</h1>

          {fields.map((field, index) => (
            <div key={field.id} className="border p-6 rounded-lg shadow-sm bg-white space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">Certification {index + 1}</h3>
                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(index)} className="text-red-600 text-sm hover:text-red-800">Remove</button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]" {...register(`certifications.${index}.title`, { required: true })} />
                {errors.certifications && errors.certifications[index] && errors.certifications[index].title && <span className="text-red-500 text-xs mt-1">Required</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]" {...register(`certifications.${index}.issuer`, { required: true })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input type="number" min="1900" max={new Date().getFullYear()} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]" {...register(`certifications.${index}.year`, { required: true })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link (optional)</label>
                  <input type="url" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DC08D]" {...register(`certifications.${index}.link`)} />
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button type="button" onClick={() => append({ title: '', issuer: '', year: '', link: '' })} className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition">Add another</button>
            <button type="submit" className="sm:ml-auto bg-[#2DC08D] hover:bg-[#25a075] text-white px-8 py-3 rounded-md font-medium shadow-md transition">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Certification;
