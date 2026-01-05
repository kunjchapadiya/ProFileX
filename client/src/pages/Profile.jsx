import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // Ideally this should redirect to login or be protected by a route wrapper
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-teal-500 to-[#2DC08D]"></div>
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 mb-6">
              <div className="relative">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=random&color=fff&size=200`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                />
                <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-400 border-2 border-white"></div>
              </div>

              <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0 flex-1">
                <h1 className="text-3xl font-bold text-gray-800">{user.displayName || user.email.split('@')[0]}</h1>
                <p className="text-gray-500">{user.email}</p>
              </div>

              <div className="mt-6 md:mt-0">
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-100 transition font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 border-t pt-6 border-gray-100">
              <div className="flex items-center text-gray-600">
                <span className="font-semibold text-gray-900 mr-2">1</span> Saved Resume
              </div>
              {/* Add more stats here if available */}
            </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default Profile;