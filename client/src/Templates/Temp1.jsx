import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const defaults = {
  personal: {
    fullName: "",
    email: "",
    contactNo: "",
    city: "",
  },
  summary: "",
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  languages: [],
  social: {},
};

const ResumeTemplate = ({ data }) => {
  const { user, loading: authLoading } = useAuth();

  const [internalProfile, setProfile] = useState(defaults);
  const [fetching, setFetching] = useState(true);

  // If data is provided via props, use it. Otherwise fetch.
  const profile = data || internalProfile;

  useEffect(() => {
    if (data) {
      setFetching(false);
      return;
    }

    if (!user || authLoading) return;

    const fetchUserData = async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setProfile({ ...defaults, ...snap.data() });
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchUserData();
  }, [user, authLoading, data]);

  if ((authLoading || fetching) && !data) {
    return <p className="text-center mt-10">Loading resume...</p>;
  }

  const {
    personal,
    skills,
    experience,
    education,
    projects,
    certifications,
    languages,
    social,
    summary,
  } = profile;

  return (
    <div className="max-w-[800px] mx-auto my-5 p-10 bg-white text-gray-900 font-sans shadow-xl">

      {/* HEADER */}
      <header className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-4xl font-bold">{personal.fullName}</h1>
        <p className="text-sm mt-1">
          {personal.email} | {personal.contactNo} | {personal.city}
        </p>
        <div className="flex gap-4 mt-2 text-xl">
          <a href={social.linkedin || "https://www.linkedin.com"} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900"><FaLinkedin /></a>
          <a href={social.github || "https://github.com"} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black"><FaGithub /></a>
          {social.portfolio && <a href={social.portfolio} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800"><FaGlobe /></a>}
        </div>
      </header>

      {/* SUMMARY */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">
            Professional Summary
          </h2>
          <p>{summary}</p>
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">
            Skills
          </h2>
          <p>{skills.join(", ")}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">
            Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="sec flex justify-between">

                <p className="font-semibold text-lg">
                  {exp.role} – {exp.company}
                </p>
                <p className="text-sm">
                  {exp.from} – {exp.to}
                </p>
              </div>
              <ul>

                <li
                  className="mt-1">{exp.description}</li>
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">
            Projects
          </h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <p className="font-semibold">{proj.title || proj.role}</p>
                {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline">Link</a>}
              </div>
              <p className="text-sm font-medium text-gray-700">Tools: {proj.techStack}</p>
              <p className="text-sm">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="sec flex justify-between">

                <p className="font-semibold">{edu.course || edu.degree}</p>
                <p className="text-sm text-gray-600">
                  {edu.passedOutMonth ? `Graduated: ${edu.passedOutMonth}` : `${edu.from} - ${edu.to}`}
                </p>
              </div>
              <p className="text-sm">
                {edu.institution}, {edu.city}
              </p>

            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">
            Certifications
          </h2>
          <ul className="list-disc list-inside">
            {certifications.map((cert, i) => (
              <li key={i}>
                {cert.title} – {cert.from} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* LANGUAGES */}
      {languages.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">
            Languages
          </h2>
          <ul className="list-disc list-inside">
            {languages.map((lang, i) => (
              <li key={i}>
                {lang.name} – {lang.level}
              </li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
};

export default ResumeTemplate;
