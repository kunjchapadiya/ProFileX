import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebase/firebase";

const AuthContext = createContext();

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Auth state listener (VERY IMPORTANT)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe; // cleanup
  }, []);

  // 🔹 Google login
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    return result;
  };

  // 🔹 Email signup
  const createUser = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  };

  // 🔹 Email login
  const signInUser = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  };

  // 🔹 Logout
  const signOutUser = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    createUser,
    signInUser,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
