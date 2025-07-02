import { useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../axiosPublic/UseAxiosPublic";
import { easeIn, motion } from "motion/react";


const AdminProfile = () => {
 
  const { user, loading } = UseAuth();
  const axiosPublic = useAxiosPublic();
  if (loading) {
    return <progress className="progress w-56"></progress>
  }
  const [singleUser, setUser] = useState({});
  useEffect(() => {
    const faceData = async () => {
      const { data } = await axiosPublic.get(`/singleUsers/${user.email}`);
      setUser(data)
    }
    faceData()
   
  },[])
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{opacity:1,transition:{duration:2, ease:easeIn}}}
      className={`p-6 min-h-screen my-16`}>
      <div className="max-w-3xl mx-auto  p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <img src={singleUser.picPro} alt="Profile" className="w-24 h-24 rounded-full border-4 border-blue-500" />
          <div>
            <h2 className="text-2xl font-bold">{singleUser.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{singleUser.role}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">📋 User Information</h3>
          <div className="space-y-3">
            <p><strong>Email:</strong> {singleUser.email}</p>
            <p><strong>Phone:</strong> {singleUser.phone}</p>
            <p><strong>Address:</strong> {singleUser.address}</p>
            <p><strong>Joined:</strong> {singleUser.joinedDate}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Link to={`/dashboard/updateProfile/${singleUser?._id}`}>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-md transition">Edit Profile</button>
          </Link>
        </div>
      </div>
  </motion.div>
  );
};

export default AdminProfile;