import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../axiosPublic/UseAxiosPublic';
import { FaGoogle } from 'react-icons/fa';

const Social = () => {
  const { googleLogin } = UseAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleGoogleSignIn = () => {
    googleLogin()
      .then(result => {
      // console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        joinedDate:new Date()
        
      }
      axiosPublic.post('/users', userInfo)
        .then(result => {
          // console.log(result.data);
        navigate('/')
      })
    })
  }
  return (
    <div>
      <button onClick={handleGoogleSignIn} className="btn w-full my-3 mx-auto">
<FaGoogle></FaGoogle>
  Sign In With Google
</button>
    </div>
  );
};

export default Social;