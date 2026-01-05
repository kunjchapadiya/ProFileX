
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

const Temp3 = () => {
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
    const { personal, skills, experience, education, projects, certifications, summary, social } = profile;

    return (
        <div className="max-w-[800px] mx-auto my-10 bg-white font-sans text-gray-800 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[1000px]">

            {/* Sidebar */}
            <aside className="w-full md:w-1/3 bg-slate-900 text-white p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold leading-tight">{personal.fullName}</h1>
                    <p className="text-slate-400 text-sm mt-2">{personal.city}</p>
                    <p className="text-slate-400 text-sm">{personal.contactNo}</p>
                    <p className="text-slate-400 text-sm break-words">{personal.email}</p>
                    <div className="flex gap-4 mt-4 text-xl">
                        <a href={social.linkedin || "https://www.linkedin.com"} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400"><FaLinkedin /></a>
                        <a href={social.github || "https://github.com"} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400"><FaGithub /></a>
                        {social.portfolio && <a href={social.portfolio} target="_blank" rel="noopener noreferrer" className="text-white hover:text-teal-400"><FaGlobe /></a>}
                    </div>
                </div>

                {skills.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold border-b border-slate-700 pb-2 mb-4">Skills</h3>
                        <ul className="space-y-2 text-sm">
                            {skills.map((skill, i) => <li key={i} className="flex items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>{skill}</li>)}
                        </ul>
                    </div>
                )}

                {education.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold border-b border-slate-700 pb-2 mb-4">Education</h3>
                        {education.map((edu, i) => (
                            <div key={i} className="mb-4">
                                <p className="font-bold text-sm">{edu.course || edu.degree}</p>
                                <p className="text-xs text-slate-400">{edu.institution}, {edu.city}</p>
                                <p className="text-xs text-slate-500">{edu.passedOutMonth ? `Grad: ${edu.passedOutMonth}` : `${edu.from} - ${edu.to}`}</p>
                            </div>
                        ))}
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="w-full md:w-2/3 p-8">
                {summary && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4">Professional Profile</h2>
                        <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
                    </div>
                )}

                {experience.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4">Experience</h2>
                        {experience.map((exp, i) => (
                            <div key={i} className="mb-6">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg">{exp.role}</h3>
                                    <span className="text-sm font-semibold text-slate-600">{exp.from} - {exp.to}</span>
                                </div>
                                <p className="text-sm font-medium text-slate-600 mb-2">{exp.company}</p>
                                <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {projects.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-2 mb-4">Projects</h2>
                        {projects.map((proj, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between">
                                    <h3 className="font-bold">{proj.title || proj.role}</h3>
                                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline">Link</a>}
                                </div>
                                <p className="text-xs text-slate-500 mb-1">{proj.techStack}</p>
                                <p className="text-sm text-gray-700">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Temp3;
