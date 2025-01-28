import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import UseAuth from '../Hooks/UseAuth';
import useAxiosPublic from '../axiosPublic/UseAxiosPublic';
import Swal from 'sweetalert2';
import Social from '../social/Social';

const Register = () => {
  const { user, createUser, updateUserProfile } = UseAuth();

  const axiosPublic = useAxiosPublic();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()


  const onSubmit = (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      picPro: data.photo,
      premiumTaken: null,
    }
    // console.log(data),

      createUser(data?.email, data?.password)
        .then(res => {
          // console.log(res);
          updateUserProfile(data?.name, data?.photo)
            .then(async () => {

              const { data } = await axiosPublic.post('/users', userInfo)
              if (data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Sign Up success",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            })
        })
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className='form-control'>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" {...register('name', { required: true })} placeholder="Enter Your Name" className="input input-bordered" />
              {errors.name&&<p role="alert" className='text-red-600'>name is required</p>}
            </div>
            <div className="form-control">

              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input {...register('email', { required: true })} type="email" placeholder="Enter Your Email" className="input input-bordered" />
             {errors.email&&<p role="alert" className='text-red-600'>email is required</p>}
            </div>
            <div className="form-control">

              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input {...register('photo', { required: true })} type="text" placeholder="Enter Your photoURL" className="input input-bordered" />
             {errors.photo&&<p role="alert" className='text-red-600'>photo is required</p>}
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value='Sign Up' />
            </div>
          </form>
          <p className='text-center my-2'><small>already have account go to </small><Link className='font-bold' to='/login'>Login</Link></p>
          <Social></Social>
        </div>
      </div>
    </div>
  );
};

export default Register;