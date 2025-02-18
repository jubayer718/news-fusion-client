import React from 'react';
import useMyArticle from '../../Hooks/useMyArticle';
import UseAuth from '../../Hooks/UseAuth';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../useAxiosSecure/UseAxiosSecure';
import Swal from 'sweetalert2';

const MyArticles = () => {
  const { loading } = UseAuth();
  const axiosSecure = useAxiosSecure();
   
  if (loading) {
    return <progress className="progress w-56"></progress>
  }

  const [myArticles,refetch] = useMyArticle();
  // console.log(myArticles[0].isPremium);

  // delete functionality
  const handleDelete = (id) => {
   Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async(result) => {
  if (result.isConfirmed) {
    const { data } = await axiosSecure.delete(`/article/${id}`)
    if (data.deletedCount > 0) {
      refetch()
     
      Swal.fire({
        title: "Deleted!",
        text: "Your article has been deleted.",
        icon: "success"
      });
   } 
  }
});
  }
  return (
   <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
          #
          </label>
        </th>
        <th>image</th>
        <th>Article Title</th>
        <th>Status</th>
        <th>isPremium</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
          {myArticles.map((article, index) => (
           <tr key={article._id}>
        <th>
          {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={article.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          
          </div>
        </td>
        <td>
        {article.title}
         
              </td>
            
              <td className=''>{ article.status } {article.status==='declined'&&<button onClick={()=>document.getElementById('my_modal_1').showModal()}  className='btn btn-xs  bg-orange-400'>see cause</button>}</td>
              <td className=''>{ article.isPremium?'Yes':'No'}</td>
             
        <th className='flex gap-4 flex-col items-center'>
         <Link to={`/articleDetails/${article._id}`}> <button className="btn bg-orange-300 btn-ghost btn-xs">details</button></Link>
            <Link to={`/articleUpdate/${article._id}`}><button  className="btn btn-ghost bg-green-200 btn-xs">Update</button></Link>
                <button onClick={() => handleDelete(article._id)} className="btn btn-ghost bg-red-400 btn-xs">Delete</button>
        </th>
      </tr>
      ))}
   
   
     
      {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
   
    <p className="py-4">The topic covered in this article does not align with our platform’s focus or the interests of our audience. Please ensure submissions match our content guidelines.</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </tbody>
   
  </table>
</div>
  );
};

export default MyArticles;