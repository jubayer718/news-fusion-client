import { useContext } from "react";
import { authContext } from "../Provider/AuthProvider";


const UseAuth = () => {
  const auth =useContext(authContext)
  return auth;

};

export default UseAuth;