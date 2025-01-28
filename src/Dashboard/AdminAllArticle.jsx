import Swal from "sweetalert2";
import useArticles from "../Hooks/useArticles";
import SectionTitle from "../shared/sectionTitle/SectionTitle";
import useAxiosSecure from "../useAxiosSecure/UseAxiosSecure";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";



const AdminAllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const {count}=useLoaderData()
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [articles, refetch] = useArticles(currentPage,usersPerPage);
  const numberOfPages = Math.ceil(count / usersPerPage);
  const pages = [...Array(numberOfPages).keys()]


// const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility control
//   const [reason, setReason] = useState(""); // Decline reason state
  

//   // approve article
  const onApprove = async (id) => {
    const res = await axiosSecure.patch(`/status/approve/${id}`);
    if (res.data.modifiedCount > 0) {
      refetch()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "status updated",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }


//   //delete article
  const onDelete = (id) => {
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
    const { data } = await axiosSecure.delete(`/status/delete/${id}`);
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

//   // make article to premium
  const onMakePremium = async(id) => {
    const { data } = await axiosSecure.patch(`/status/makePremium/${id}`)
    if (data.modifiedCount > 0) {
      refetch()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "this article now premium",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }




  //   //decline article
  const onDecline = async (id) => {
   






    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, decline it!"
}).then(async(result) => {
  if (result.isConfirmed) {
    const { data } = await axiosSecure.put(`/status/decline/${id}`);
    if (data.modifiedCount > 0) {
      refetch()
     Swal.fire({
      title: "Decline!",
      text: "Your file has been Decline.",
      icon: "success"
     });
       
    }
    
    
  }
});
  
    
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
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
      

     {/* {isModalOpen&&(`${document.getElementById('my_modal_1').showModal()}`)}
       <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog" className="w-full">
               if there is a button in form, it will close the modal 
              <textarea
                 id="declineReason"
              name="cause"
              className="textarea textarea-bordered w-full my-3"
              placeholder="Write your reason here"
              value={reason}
              onChange={(e) => setReason(e.target.value)} 
              ></textarea>
               <button
                onClick={()=>onDecline()} 
                className="btn btn-error"
              >
                Confirm Decline
              </button>
              <button   className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog> */}

      <SectionTitle heading={'All Articles'} subHeading={'Explore a Wide Range of Topics and Insights'}></SectionTitle>

      <div className="p-6 max-w-7xl mx-auto bg-white shadow-md rounded-md">


        <table className="table table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-2">Title</th>
              <th className="border border-gray-200 p-2">Author</th>
              <th className="border border-gray-200 p-2">Posted Date</th>
              <th className="border border-gray-200 p-2">Status</th>
              <th className="border border-gray-200 p-2">Publisher</th>
              <th className="border border-gray-200 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id} className="hover:bg-gray-50">
                <td className="border  border-gray-200 p-2">{article.title}</td>
                <td className="border border-gray-200 p-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={article.author.photo}
                      alt={article.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">Name: {article.author.name}</p>
                      <p className="text-sm text-gray-500">Email: {article.author.email}</p>
                    </div>
                  </div>
                </td>
                <td className="border border-gray-200 p-2">
                  {new Date(article.postedDate).toLocaleString("en-US", {
                    timeZone: "GMT",
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="border border-gray-200 p-2">
                  <span
                    className={`badge font-medium ${article.status === "approved"
                        ? "badge-success py-3"
                        : article.status === "pending"
                          ? "badge-warning py-3"
                          : "badge-error py-3"
                      }`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="border border-gray-200 p-2">{article.publisher}</td>
                <td className="border border-gray-200 p-2 space-y-2">
                  {/* approve article */}
                  <button
                    className="btn btn-sm btn-success w-full"
                    onClick={() => onApprove(article._id)}
                    disabled={article.status === "approved"}
                  >
                    Approve
                  </button>
                  {/* decline article */}
                  <button
                    className="btn btn-sm btn-error w-full"

                    // onClick={()=>document.getElementById('my_modal_1').showModal()}
                    onClick={() => onDecline(article._id)}
                    disabled={article.status === "declined"}
                  >
                    Decline
                  </button>
                  {/* delete article */}
                  <button
                    className="btn btn-sm btn-outline w-full"
                  onClick={() => onDelete(article._id)}
                  >
                    Delete
                  </button>
                  {/* make premium article */}
                  <button
                    className="btn btn-sm btn-info w-full"
                    onClick={() => onMakePremium(article._id)}
                    disabled={article.isPremium}
                  >
                    {article.isPremium? 'Premium':'  Make Premium'}
                  
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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





    </div>
  );
};

export default AdminAllArticles;