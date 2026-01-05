import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {

    const result = await signInWithPopup(auth, provider);
    return result; // caller can read result.user

};

const createUser = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result;
};

const signInUser = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
  return result;
}

const signOutUser = async () => {
  await signOut(auth);
};

const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

export { onAuthStateChangedListener };

export { auth, provider, signInWithGoogle, signOutUser, createUser, signInUser};
