import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Social from '../social/Social';
import UseAuth from '../Hooks/UseAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../useAxiosSecure/UseAxiosSecure';
import useAxiosPublic from '../axiosPublic/UseAxiosPublic';

const Login = () => {
  const { handleLogin, updateUserProfile, user } = UseAuth();
  
  const axiosPublic=useAxiosPublic()
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => {
    // console.log(data)
    handleLogin(data.email, data.password)
      .then(res => {
        // console.log(res.user?.email);
        updateUserProfile(res.user.displayName, res.user.photoURL)
          .then(async () => {
             const userInfo = {
      // name: data.name,
      email: res.user?.email,
      // picPro: data.photo,
      // premiumTaken: null,
    }
            const {data}=await axiosPublic.post('/users',userInfo)
            // console.log(data);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Sign in success",
                showConfirmButton: false,
                timer: 1500
              });
            
          })
        navigate(from,{replace:true})
      })

  }

  return (
    <div>
      <div className="hero bg-orange-100 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-orange-300 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">

              <div className="form-control">

                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input {...register('email', { required: true })} type="email" placeholder="Enter Your Email" className="input input-bordered" />
                {errors.email && <p role="alert" className='text-red-600'>email is required</p>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", {
                  required: true,
                  pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                  minLength: 6,
                  maxLength: 20
                })} placeholder="password" className="input input-bordered" />
                {errors.password?.type === "required" && (
                  <p role="alert" className='text-red-600'>password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p role="alert" className='text-red-600'>password must be 6 character </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p role="alert" className='text-red-600'>password must have one uppercase one lowercase one number one special character  </p>
                )}

              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value='Sign In' />
              </div>
            </form>
            <p className='text-center my-2'><small>you haven't account go to </small><Link className='font-bold' to='/register'>register</Link></p>
            <Social></Social>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;