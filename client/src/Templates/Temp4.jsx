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

const Temp4 = () => {
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
        <div className="max-w-[800px] mx-auto my-10 bg-white p-10 font-mono text-gray-900 shadow-md">
            <header className="text-center border-b-4 border-black pb-8 mb-8">
                <h1 className="text-5xl font-bold uppercase mb-4 tracking-tighter">{personal.fullName}</h1>
                <div className="flex justify-center flex-wrap gap-4 text-sm font-semibold">
                    <span>{personal.email}</span>
                    <span>|</span>
                    <span>{personal.contactNo}</span>
                    <span>|</span>
                    <span>{personal.city}</span>
                </div>
                <div className="flex justify-center gap-4 mt-4 text-xl">
                    <a href={social.linkedin || "https://www.linkedin.com"} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600"><FaLinkedin /></a>
                    <a href={social.github || "https://github.com"} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600"><FaGithub /></a>
                    {social.portfolio && <a href={social.portfolio} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600"><FaGlobe /></a>}
                </div>
            </header>

            {summary && (
                <div className="mb-8">
                    <p className="text-sm leading-relaxed text-justify">{summary}</p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                {experience.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b-2 border-black mb-4">Experience</h2>
                        {experience.map((exp, i) => (
                            <div key={i} className="mb-4 pl-4 border-l-2 border-black">
                                <div className="flex justify-between">
                                    <h3 className="font-bold text-lg">{exp.company}</h3>
                                    <span className="text-sm font-bold">{exp.from} – {exp.to}</span>
                                </div>
                                <div className="italic text-sm mb-2">{exp.role}</div>
                                <p className="text-sm">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {projects.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b-2 border-black mb-4">Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="border border-black p-3 hover:bg-black hover:text-white transition-colors duration-300">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold">{proj.title || proj.role}</h3>
                                        {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs underline">Link</a>}
                                    </div>
                                    <p className="text-xs font-mono mt-1 opacity-70">{proj.techStack}</p>
                                    <p className="text-xs mt-1 truncate">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-8">
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-3">Education</h2>
                            {education.map((edu, i) => (
                                <div key={i} className="mb-2">
                                    <p className="font-bold">{edu.course || edu.degree}</p>
                                    <p className="text-sm">{edu.institution}, {edu.city}</p>
                                    <p className="text-xs">{edu.passedOutMonth ? `Grad: ${edu.passedOutMonth}` : `${edu.from} - ${edu.to}`}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-3">Skills</h2>
                            <p className="text-sm leading-6">{skills.join(" • ")}</p>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Temp4;
