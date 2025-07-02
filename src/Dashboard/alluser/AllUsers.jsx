import React, { useState } from 'react';
import useAxiosSecure from '../../useAxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrash, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useLoaderData, useParams } from 'react-router-dom';
import './pagination.css'
import { easeIn, motion } from "motion/react";
const AllUsers = () => {

  const axiosSecure = useAxiosSecure();
  const { count } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const numberOfPages = count && usersPerPage ? Math.ceil(count / usersPerPage) : 0;
  const pages = numberOfPages > 0 ? [...Array(numberOfPages).keys()] : [];
  // console.log(pages);
  // console.log(count);
  const { refetch,data: users=[] } = useQuery({
    queryKey: ['user',currentPage,usersPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${currentPage}&size=${usersPerPage}`)
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
  

  const handleUsersPerPage = e => {
    // console.log(e.target.value);
    const val = parseInt(e.target.value);
    setUsersPerPage(val);
    setCurrentPage(0)
  }
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage-1)
    }
  }
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage+1)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{opacity:1,transition:{duration:2, ease:easeIn}}}
    >
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
              <th>Profile Pic</th>
              <th>Role</th>
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
                  <td>
                    {/* <button onClick={() => handleDelete(user)} className="btn btn-ghost btn-lg"><FaTrash className='text-red-600'></FaTrash></button> */}
                <img className='w-16 h-16 rounded-full' src={user?.picPro} alt="" />
                  </td>
                  <td className=' '>{user.role==='admin'?'admin':<button onClick={()=>makeAdmin(user)} className='btn bg-orange-600 '><FaUsers className='text-2xl'></FaUsers></button> }</td>
                  
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
        <div className='pagination '>
          <p>current Page: {currentPage}</p>
          <button className='btn mr-1' onClick={handlePrevPage}>Prev</button>
          {pages.map(page => <button
            onClick={()=>setCurrentPage(page)}
             key={page} className={currentPage===page?'btn mr-1 selected':'btn mr-1'}>{page}
          </button>)}
          <button className='btn ml-1' onClick={handleNextPage}>Next</button>
          <select value={usersPerPage}  className='btn' onChange={handleUsersPerPage}>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
            </div>
    </div>
    </motion.div>
  );
};

export default AllUsers;