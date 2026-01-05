import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

const Skills = () => {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");

  const addSkill = () => {
    const value = input.trim();
    if (!value) return;
    if (skills.includes(value)) return;

    setSkills([...skills, value]);
    setInput("");
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // ✅ renamed to avoid conflict
  const onSubmit = async () => {
    console.log("Skills Data:", skills, user);

    if (!user) {
      alert('Please log in to save your skills')
      return
    }

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          skills,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )

      navigate('/certifications')
    } catch (error) {
      console.error('Failed to save skills', error)
      alert('Failed to save skills. Check console for details.')
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">

      {/* LEFT */}
      <div className="bg-[#2DC08D] w-full md:w-1/3 min-h-[200px] md:min-h-screen flex flex-col justify-center items-center py-10 md:py-0">
        <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
          <h1 className="text-4xl font-bold text-[#2DC08D]">04</h1>
        </div>
        <h1 className="text-2xl font-semibold text-white mt-4">
          Skills
        </h1>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-2/3 flex justify-center items-center p-6 md:p-12">
        <div className="max-w-xl w-full mx-6 p-6 bg-white rounded shadow">

          <h2 className="text-2xl font-semibold text-[#2DC08D] mb-4 text-center md:text-left">
            Skills
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add your skills
            </label>

            <div className="border border-gray-300 rounded-md p-2 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="font-bold hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Type a skill and press Enter"
                className="flex-1 min-w-[150px] outline-none text-sm px-2 py-1"
              />
            </div>

            <div className="mt-6 flex">
              <button
                type="submit"
                className="ml-auto bg-[#2DC08D] text-white px-6 py-3 rounded-md font-medium text-lg w-full md:w-auto"
              >
                Next
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Skills;
