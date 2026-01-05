import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signInUser, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  // 🔹 Email + Password login
  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password)
      navigate('/') // dashboard / home
    } catch (error) {
      alert(error.message)
    }
  }

  // 🔹 Google login
  const handleGoogle = async () => {
    try {
      await signInWithGoogle()
      navigate('/')
    } catch {
      alert('Google sign-in failed')
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">

      {/* LEFT */}
      <div className="bg-[#2DC08D] w-full md:w-1/3 flex flex-col justify-center items-center py-10">
        <div className="w-24 h-24 bg-white rounded-full flex justify-center items-center shadow-lg">
          <h1 className="text-4xl font-bold text-[#2DC08D]">PX</h1>
        </div>
        <h2 className="text-2xl font-semibold text-white mt-6">
          Welcome Back
        </h2>
        <p className="text-white mt-3 text-center px-6">
          Sign in to continue building your professional resume
        </p>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-2/3 flex justify-center items-center py-10 px-4 md:px-0">
        <div className="max-w-md w-full mx-6 p-8 bg-white rounded-lg shadow-lg">

          <h1 className="text-3xl font-semibold text-[#2DC08D] text-center">
            Login
          </h1>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2DC08D]"
                placeholder="you@example.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  Email is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register('password', { required: true })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2DC08D]"
                placeholder="Enter password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Link to="/signup" className="text-sm text-[#2DC08D]">
                Create account
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2DC08D] text-white px-4 py-2 rounded-md font-medium"
            >
              Sign in
            </button>
          </form>

          {/* Google */}
          <div className="mt-4 text-center">
            <button
              onClick={handleGoogle}
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-md shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="google"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
