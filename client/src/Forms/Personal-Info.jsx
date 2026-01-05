import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { useAuth } from '../context/AuthContext'

const PersonalInfo = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { user } = useAuth() // 🔑 get logged-in user

  const onSubmit = async (data) => {
    if (!user) return

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          personal: {
            fullName: data.fullName,
            email: data.email,
            contactNo: data.contactno,
            city: data.city,
          },
          summary: data.summary,
          updatedAt: serverTimestamp(),
        },
        { merge: true } // 🔥 VERY IMPORTANT
      )

      navigate('/education-info')
    } catch (error) {
      console.error('Failed to save personal info', error)
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">

      {/* LEFT */}
      <div className="bg-[#2DC08D] w-full md:w-1/3 flex flex-col justify-center items-center py-10 md:py-0">
        <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
          <h1 className="text-4xl font-bold text-[#2DC08D]">1</h1>
        </div>
        <h1 className="text-2xl font-semibold text-white mt-4">
          Personal Info
        </h1>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-2/3 flex justify-center items-center p-6 md:p-12">
        <form
          className="flex flex-col w-full max-w-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col mt-5">
            <label className="text-lg font-medium">Full Name</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              {...register('fullName', { required: true })}
            />
            {errors.fullName && (
              <span className="text-red-500">Required</span>
            )}
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-lg font-medium">Role</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
              {...register('role', { required: true })}
            />
            {errors.contactno && (
              <span className="text-red-500">Required</span>
            )}
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded-md p-2 w-full"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Required</span>
            )}
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-lg font-medium">Contact No</label>
            <input
              type="tel"
              className="border border-gray-300 rounded-md p-2 w-full"
              {...register('contactno', { required: true })}
            />
            {errors.contactno && (
              <span className="text-red-500">Required</span>
            )}
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-lg font-medium">City</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              {...register('city', { required: true })}
            />
            {errors.city && (
              <span className="text-red-500">Required</span>
            )}
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-lg font-medium">Professional Summary</label>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full h-32 resize-none"
              placeholder="Briefly describe your professional background..."
              {...register('summary')}
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-[#2DC08D] text-white px-6 py-3 rounded-md font-medium text-lg w-full md:w-auto self-end"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  )
}

export default PersonalInfo
