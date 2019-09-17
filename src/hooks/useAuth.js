import React, { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../config/firebase.js'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};


// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    
    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password) => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          setUser(response.user);
          if (error) setError(null)
          return response.user;
        })
        .catch(err => {
          setError(err)
          // return err;
        });
    };
  
    const signup = (email, password) => {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          setUser(response.user);
          if (error) setError(null)
          return response.user;
        })
        .catch(err => {
          setError(error);
          // return err;
        });
    };
  
    const signout = () => {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          setUser(false);
        });
    };
  
    const sendPasswordResetEmail = email => {
      return firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          return true;
        });
    };
  
    const confirmPasswordReset = (code, password) => {
      return firebase
        .auth()
        .confirmPasswordReset(code, password)
        .then(() => {
          return true;
        });
    };
  
    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setUser(user);
        } else {
          setUser(false);
        }
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);

    // useEffect(()=> {
    //   console.log('ERROR', error)
    // }, [error])
    
    // Return the user object and auth methods
    return {
      user,
      error,
      signin,
      signup,
      signout,
      sendPasswordResetEmail,
      confirmPasswordReset
    };
  }