
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

const Temp5 = () => {
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
    const { personal, skills, experience, education, projects, languages, summary, social } = profile;

    return (
        <div className="max-w-[800px] mx-auto my-10 bg-white shadow-2xl">
            <div className="h-4 bg-teal-500 w-full"></div>
            <div className="p-12">
                <header className="flex justify-between items-end border-b border-gray-300 pb-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-light text-gray-900">{personal.fullName}</h1>
                        <p className="text-teal-600 font-medium mt-2 text-lg">{personal.city}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                        <p>{personal.email}</p>
                        <p>{personal.contactNo}</p>
                        <div className="flex justify-end gap-3 mt-2 text-lg">
                            <a href={social.linkedin || "https://www.linkedin.com"} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-teal-600"><FaLinkedin /></a>
                            <a href={social.github || "https://github.com"} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-teal-600"><FaGithub /></a>
                            {social.portfolio && <a href={social.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-teal-600"><FaGlobe /></a>}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8">
                    <main className="col-span-8">
                        {summary && (
                            <div className="mb-8">
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Profile</h2>
                                <p className="text-gray-700 leading-relaxed text-sm">{summary}</p>
                            </div>
                        )}

                        {experience.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Work Experience</h2>
                                {experience.map((exp, i) => (
                                    <div key={i} className="mb-6 relative pl-4 border-l-2 border-gray-200">
                                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-teal-500"></div>
                                        <h3 className="font-bold text-gray-800">{exp.role}</h3>
                                        <p className="text-sm font-medium text-teal-600 mb-1">{exp.company}</p>
                                        <p className="text-xs text-gray-500 mb-2">{exp.from} - {exp.to}</p>
                                        <p className="text-sm text-gray-600">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {projects.length > 0 && (
                            <div>
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Projects</h2>
                                {projects.map((proj, i) => (
                                    <div key={i} className="mb-3">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-gray-800 text-sm">{proj.title || proj.role}</h3>
                                            <span className="text-xs text-teal-600 font-medium">{proj.techStack}</span>
                                        </div>
                                        {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="font-normal text-xs text-teal-600 underline block mb-1">View Project</a>}
                                        <p className="text-xs text-gray-600 mt-1">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>

                    <aside className="col-span-4">
                        {education.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Education</h2>
                                {education.map((edu, i) => (
                                    <div key={i} className="mb-4">
                                        <p className="font-bold text-sm text-gray-800">{edu.course || edu.degree}</p>
                                        <p className="text-xs text-teal-600">{edu.institution}, {edu.city}</p>
                                        <p className="text-xs text-gray-500">{edu.passedOutMonth || `${edu.from} - ${edu.to}`}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {skills.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Expertise</h2>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {skills.map((skill, i) => <li key={i}>{skill}</li>)}
                                </ul>
                            </div>
                        )}

                        {languages.length > 0 && (
                            <div>
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Languages</h2>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {languages.map((lang, i) => <li key={i} className="flex justify-between"><span>{lang.name}</span> <span className="text-gray-400 text-xs">{lang.level}</span></li>)}
                                </ul>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Temp5;
