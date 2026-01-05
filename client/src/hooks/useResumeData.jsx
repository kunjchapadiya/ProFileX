import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Adjust path as needed
import { useAuth } from "../context/AuthContext"; // Adjust path as needed

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
    social: {
        linkedin: "",
        github: "",
        portfolio: "",
    },
};

const useResumeData = () => {
    const { user, loading: authLoading } = useAuth();
    const [resumeData, setResumeData] = useState(defaults);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const snap = await getDoc(doc(db, "users", user.uid));
                if (snap.exists()) {
                    setResumeData({ ...defaults, ...snap.data() });
                }
            } catch (err) {
                console.error("Error fetching resume:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user, authLoading]);

    return { resumeData, loading };
};

export default useResumeData;
