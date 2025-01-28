import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../axiosPublic/UseAxiosPublic";
export const authContext = createContext(null);
const AuthProvider = ({children}) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
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
      if (currentUser) {
        // get token and set to client.
        const userInfo = { email: currentUser.email };
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token)
               setLoading(false)
          }
        })
        

      } else {
        // remove the token from localStorage.
      // // remove token from client 
        localStorage.removeItem('access-token')
        setLoading(false)
      }
     
    })
    return () => {
      unsubscribe()
    }
  },[axiosPublic])
  return (
    <authContext.Provider value={authInfo}>
      {children}
    </authContext.Provider>
      
    )
};

export default AuthProvider;