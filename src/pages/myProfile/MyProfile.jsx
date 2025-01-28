import { Link } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";


const MyProfile = () => {
  const { user } = UseAuth();
  // console.log(user);
  return (
    <div className="flex items-center justify-center my-12">
      <div className="card card-compact bg-base-100 w-96 lg:w-[500px] shadow-xl">
  <figure>
    <img
      src={user?.photoURL}
      alt="profile photo" />
  </figure>
  <div className="card-body">
        <h2 className="card-title">Name: { user?.displayName}</h2>
        <p className="text-lg">Email: { user?.email}</p>
    <div className="card-actions justify-end">
   <Link className="w-full" to={`/updateProfile`}>   <button className="w-full btn bg-orange-400">Update</button></Link>
    </div>
  </div>
</div>
  </div>
  );
};

export default MyProfile;