import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

// Create a context to manage authentication-related state and functions
const AuthContext = createContext();

// Provide the authentication context to the application
export function AuthContextProvider({ children }) {

  // State variable to store user information
  const [user, setUser] = useState({});

  // Function to sign up a user with email and password
  function signUp(email, password) {

    // Create a new user account using Firebase authentication
    createUserWithEmailAndPassword(auth, email, password);

    // Initialize user-specific data in Firestore
    setDoc(doc(db, 'users', email), {
      savedShows: []
    });

  }

  // Function to log in a user with email and password
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password); // Sign in an existing user using Firebase authentication
  }

  // Function to log out the current user
  function logOut() {
    return signOut(auth); // Sign out the current user using Firebase authentication
  }

  // Subscribe to changes in the authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Unsubscribe from the authentication state changes when the component unmounts
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  // Provide the authentication context and its functions to the application
  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );

}

// Hook to access the authentication context and its functions
export function UserAuth() {
  return useContext(AuthContext);
}