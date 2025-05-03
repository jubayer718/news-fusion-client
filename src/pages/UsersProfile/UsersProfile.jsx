import React, { useEffect, useState } from 'react';
import UseAuth from '../../Hooks/UseAuth';

const UsersProfile = () => {
  
   const {user}=UseAuth()
  const [singleUser, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:9000//singleUsers/${user?.email}`)
      .then(res => res.json())
    .then(data=>setUser(data))
  },[])
  return (
    <div>
       <div className="flex items-center space-x-6">
          <img src={singleUser?.profileImage} alt="Profile" className="w-24 h-24 rounded-full border-4 border-blue-500" />
          <div>
            <h2 className="text-2xl font-bold">{singleUser?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{singleUser?.role}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">📋 User Information</h3>
          <div className="space-y-3">
            <p><strong>Email:</strong> {singleUser?.email}</p>
            <p><strong>Phone:</strong> {singleUser?.phone}</p>
            <p><strong>Address:</strong> {singleUser?.address}</p>
            <p><strong>Joined:</strong> {singleUser?.joinedDate}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-md transition">Edit Profile</button>
        </div>
    </div>
  );
};

export default UsersProfile;