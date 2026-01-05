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

const Temp2 = () => {
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
    const { personal, skills, experience, education, projects, certifications, languages, summary, social } = profile;

    return (
        <div className="max-w-[800px] mx-auto my-10 p-12 bg-white text-gray-800 font-serif border-t-8 border-blue-900 shadow-lg">
            <div className="text-center border-b-2 border-gray-200 pb-6 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-widest text-blue-900">{personal.fullName}</h1>
                <p className="mt-2 text-sm">{personal.city} • {personal.contactNo} • {personal.email}</p>
                <div className="flex justify-center gap-4 mt-3 text-xl">
                    <a href={social.linkedin || "https://www.linkedin.com"} target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-700"><FaLinkedin /></a>
                    <a href={social.github || "https://github.com"} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black"><FaGithub /></a>
                    {social.portfolio && <a href={social.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-700"><FaGlobe /></a>}
                </div>
            </div>

            {summary && (
                <div className="mb-6">
                    <p className="italic text-center text-gray-600 px-8">{summary}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2">
                    {experience.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-lg font-bold text-blue-900 uppercase tracking-wide border-b border-blue-900 mb-3">Professional Experience</h3>
                            {experience.map((exp, i) => (
                                <div key={i} className="mb-4">
                                    <h4 className="font-bold text-gray-900">{exp.role}</h4>
                                    <span className="text-xs text-blue-600 font-semibold uppercase">{exp.company} | {exp.from} - {exp.to}</span>
                                    <p className="text-sm mt-1 text-gray-700 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-lg font-bold text-blue-900 uppercase tracking-wide border-b border-blue-900 mb-3">Key Projects</h3>
                            {projects.map((proj, i) => (
                                <div key={i} className="mb-3">
                                    <div className="flex justify-between">
                                        <h4 className="font-bold text-gray-900">{proj.title || proj.role}</h4>
                                        {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 underline">View Project</a>}
                                    </div>
                                    <p className="text-xs text-gray-500 font-medium mb-1">{proj.techStack}</p>
                                    <p className="text-sm text-gray-700">{proj.description}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>

                <div className="col-span-1 bg-gray-50 p-4 rounded">
                    {education.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-lg font-bold text-blue-900 uppercase tracking-wide border-b border-blue-900 mb-3">Education</h3>
                            {education.map((edu, i) => (
                                <div key={i} className="mb-3">
                                    <div className="font-bold text-sm">{edu.course || edu.degree}</div>
                                    <div className="text-xs text-gray-600 mb-1">{edu.institution}, {edu.city}</div>
                                    <div className="text-xs italic text-gray-500">{edu.passedOutMonth || `${edu.from} - ${edu.to}`}</div>
                                </div>
                            ))}
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-lg font-bold text-blue-900 uppercase tracking-wide border-b border-blue-900 mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{skill}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {certifications.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-lg font-bold text-blue-900 uppercase tracking-wide border-b border-blue-900 mb-3">Certifications</h3>
                            <ul className="list-disc list-inside text-sm">
                                {certifications.map((cert, i) => <li key={i}>{cert.title}</li>)}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Temp2;
