import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// to change from database if you don't want to use FB anymore only change this lines.
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export { auth };

// hook for useAuth for saving the users info
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  // empty array because we only want to use it 1 time when the component mounths.

  return currentUser;
}
