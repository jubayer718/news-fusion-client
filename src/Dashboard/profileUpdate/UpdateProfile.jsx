import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../useAxiosSecure/UseAxiosSecure";
import Swal from "sweetalert2";


const UpdateProfile = () => {
  const data = useLoaderData();
  const navigate=useNavigate()
  const axiosSecure = useAxiosSecure();


  const handleSubmit=async(e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const picPro = form.photo.value;
    const address = form.address.value;
    const phone = form.phone.value;
    const updatedValue = {
      name,
      phone,
      picPro,
      address,
      

    }
    const res= await axiosSecure.patch(`/updateAdminData/${data?.email}`,updatedValue)
    if (res.data.modifiedCount > 0) {
      Swal.fire('Profile Update successful')
      navigate('/dashboard/adminProfile')
    }

  }
  // phone: "+880 1712-345678",
  // address: "Dhaka, Bangladesh",
  // profileImage: "https://i.ibb.co/BZZ5WKv/unsplash-Eh-Tc-C9s-YXsw-4.png",
  // joinedDate: "January 10, 2023",
  return (
    <div className="hero  min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="fieldset">
          <label className="label">Name</label>
          <input type="text" defaultValue={data?.name} name="name" className="input input-bordered" placeholder="Name" />
          <label className="label">Email</label>
          <input type="text" defaultValue={data?.email} readOnly className="input input-bordered" placeholder="email" />
          <label className="label">ProfileImage</label>
          <input  type="url" defaultValue={data?.photo} name="photo" className="input input-bordered" placeholder="Profile Image" />
          <label className="label">Address</label>
          <input type="text" defaultValue={data?.address} name="address" className="input input-bordered" placeholder="Address" />
          <label className="label">Phone</label>
          <input type="number" defaultValue={data?.phone} name="phone" className="input input-bordered" placeholder="Phone Number" />
          
          <button  type="submit" className="btn btn-neutral mt-4">Update</button>
        </form>
      </div>
    </div>
  </div>
</div>
  );
};

export default UpdateProfile;