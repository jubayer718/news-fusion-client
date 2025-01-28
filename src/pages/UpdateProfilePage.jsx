import { useLoaderData, useNavigate } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import useAxiosSecure from "../useAxiosSecure/UseAxiosSecure";
import Swal from "sweetalert2";


const UpdateProfilePage = () => {
  // const loadProfileData = useLoaderData();
  // console.log(loadProfileData);
  const { user,updateUserProfile } = UseAuth();
  // const axiosSecure=useAxiosSecure()
  const navigate=useNavigate()




  const handleSubmit = async(event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    updateUserProfile({ email: email, photoURL: photo,displayName:name })
     .then((result) => {
          Swal.fire('Profile Updated')
            navigate('/')
          }).catch(error => {
          // console.log(error)
          })
    

    
    // const profileInfo = {
    //   name,
    //   email,
    //   picPro
    // }
  //   const { data } = await axiosSecure.patch(`/users/update/${user?.email}`, profileInfo) 
  //   if (data.modifiedCount > 0) {
  //    Swal.fire('profile Update successful')
  //  }
  }
  return (
    <div className=" flex items-center justify-center my-12">
      <div className="card bg-orange-200 max-w-sm w-full  shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
         
        <img  src={user?.photoURL} alt="" />
        </div>

               

        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name"  placeholder="name" className="input input-bordered" required />
        </div>
     
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text">PhotoURL</span>
          </label>
          <input type="url" name="photo"  placeholder="email" className="input input-bordered" required />
        </div>
     
        <div className="form-control mt-6">
          <button className="btn bg-orange-400">update</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateProfilePage;