import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
export const authContext = createContext(null);
const AuthProvider = ({children}) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const handleLogin = (email,password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password)
}
  const createUser = (email,password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  }
  const updateUserProfile = (name, photo) => {
   return updateProfile(auth.currentUser,{

      displayName:name,photoURL:photo
    })
  }
  const googleLogin = () => {
    setLoading(true)
   return signInWithPopup(auth, provider)
  }
  const handleLogOut = () => {
    return signOut(auth)
  }
  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    updateUserProfile,
    googleLogin,
    handleLogOut,
    handleLogin
  }

  useEffect(() => {
    const unsubscribe= onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  },[])
  return (
    <authContext.Provider value={authInfo}>
      {children}
    </authContext.Provider>
      
    )
};

export default AuthProvider;