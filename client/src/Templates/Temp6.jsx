import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const defaults = {
    personal: { fullName: "", email: "", contactNo: "", city: "" },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    languages: [],
    social: {},
};

const Temp6 = () => {
    const { user, loading } = useAuth();
    const [profile, setProfile] = useState(defaults);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchUserData = async () => {
            try {
                const snap = await getDoc(doc(db, "users", user.uid));
                if (snap.exists()) setProfile({ ...defaults, ...snap.data() });
            } catch (err) { console.error(err); }
            finally { setFetching(false); }
        };
        fetchUserData();
    }, [user]);

    if (loading || fetching) return <p className="text-center mt-10">Loading...</p>;
    const { personal, skills, experience, education, projects, summary, social } = profile;

    return (
        <div className="max-w-[800px] mx-auto my-10 bg-[#FFFEF2] text-black font-sans p-10 border border-gray-300 shadow-xl">
            <header className="flex flex-col items-center border-b-2 border-black pb-6 mb-8">
                <h1 className="text-4xl font-extrabold uppercase tracking-wide mb-2">{personal.fullName}</h1>
                <div className="flex gap-4 text-sm font-medium">
                    <span>{personal.email}</span>
                    <span>•</span>
                    <span>{personal.contactNo}</span>
                    <span>•</span>
                    <span>{personal.city}</span>
                </div>
                <div className="flex justify-center gap-4 mt-3 text-lg">
                    <a href={social.linkedin || "https://www.linkedin.com"} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600"><FaLinkedin /></a>
                    <a href={social.github || "https://github.com"} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600"><FaGithub /></a>
                    {social.portfolio && <a href={social.portfolio} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600"><FaGlobe /></a>}
                </div>
            </header>

            {summary && (
                <div className="mb-8 text-center px-10">
                    <p className="italic text-gray-700">{summary}</p>
                </div>
            )}

            <section className="mb-8">
                <h2 className="text-center text-xl font-bold uppercase tracking-widest bg-black text-[#FFFEF2] py-1 mb-6">Professional Experience</h2>
                {experience.map((exp, i) => (
                    <div key={i} className="mb-6 px-4">
                        <div className="flex justify-between items-end border-b border-gray-400 pb-1 mb-2">
                            <h3 className="font-bold text-lg">{exp.company}</h3>
                            <span className="text-sm font-medium">{exp.from} - {exp.to}</span>
                        </div>
                        <p className="text-sm font-semibold mb-1">{exp.role}</p>
                        <p className="text-sm text-gray-800">{exp.description}</p>
                    </div>
                ))}
            </section>

            <section className="mb-8">
                <h2 className="text-center text-xl font-bold uppercase tracking-widest bg-black text-[#FFFEF2] py-1 mb-6">Education</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                    {education.map((edu, i) => (
                        <div key={i}>
                            <h4 className="font-bold">{edu.course || edu.degree}</h4>
                            <p className="text-sm">{edu.institution}, {edu.city}</p>
                            <p className="text-xs text-gray-600">{edu.passedOutMonth || `${edu.from} - ${edu.to}`}</p>
                        </div>
                    ))}
                </div>
            </section>

            {projects.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-center text-xl font-bold uppercase tracking-widest bg-black text-[#FFFEF2] py-1 mb-6">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                        {projects.map((proj, i) => (
                            <div key={i} className="border border-gray-400 p-3">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg">{proj.title || proj.role}</h3>
                                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 underline">Link</a>}
                                </div>
                                <p className="text-xs font-bold text-gray-700 mb-1">{proj.techStack}</p>
                                <p className="text-sm">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section>
                <h2 className="text-center text-xl font-bold uppercase tracking-widest bg-black text-[#FFFEF2] py-1 mb-6">Technical Skills</h2>
                <div className="flex flex-wrap justify-center gap-3 px-4">
                    {skills.map((skill, i) => (
                        <span key={i} className="border border-black px-3 py-1 text-sm font-semibold">{skill}</span>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Temp6;
