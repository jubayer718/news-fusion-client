import React from 'react';
import useAxiosSecure from '../useAxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrash, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {

  const axiosSecure = useAxiosSecure();
  const { refetch,data: users=[] } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users')
      return res.data
    }

  })

 const makeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch()
        Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});
      }
    })
}
  return (
    <div>
    <div>
      <div className='flex justify-evenly'>
        <h2 className="text-3xl">All User</h2>
        <h2 className="text-3xl">Total User: {users.length}</h2>

      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              users.map((user, idx) => (
                <tr key={user._id}>
                  <th>{idx + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className=' '>{user.role==='admin'?'admin':<button onClick={()=>makeAdmin(user)} className='btn bg-orange-600 '><FaUsers className='text-2xl'></FaUsers></button> }</td>
                  <td>
                    <button onClick={() => handleDelete(user)} className="btn btn-ghost btn-lg"><FaTrash className='text-red-600'></FaTrash></button>

                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>

    </div>
    </div>
  );
};

export default AllUsers;