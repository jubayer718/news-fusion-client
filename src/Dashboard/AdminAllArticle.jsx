import Swal from "sweetalert2";
import useArticles from "../Hooks/useArticles";
import SectionTitle from "../shared/sectionTitle/SectionTitle";
import useAxiosSecure from "../useAxiosSecure/UseAxiosSecure";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const AdminAllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { count } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [articles, refetch] = useArticles(currentPage, usersPerPage);
  const numberOfPages = count && usersPerPage ? Math.ceil(count / usersPerPage) : 0;
  const pages = numberOfPages > 0 ? [...Array(numberOfPages).keys()] : [];

  // ✅ Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const onApprove = async (id) => {
    const res = await axiosSecure.patch(`/status/approve/${id}`);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/status/delete/${id}`);
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your article has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const onMakePremium = async (id) => {
    const { data } = await axiosSecure.patch(`/status/makePremium/${id}`);
    if (data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "This article is now Premium",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const onDecline = async (id) => {
    const { data } = await axiosSecure.put(`/status/decline/${id}`, { reason });
    if (data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Declined!",
        text: "The article has been declined.",
        icon: "success",
      });
      setReason("");
      setSelectedArticleId(null);
      document.getElementById('decline_modal').close()
    }
  };

  const handleUsersPerPage = (e) => {
    const val = parseInt(e.target.value);
    setUsersPerPage(val);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <SectionTitle heading={"All Articles"} subHeading={"Explore a Wide Range of Topics and Insights"} />

      <div className="p-6 hover:text-black max-w-7xl mx-auto shadow-md rounded-md">
        <table className="table table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border text-black border-gray-200 p-2">Title</th>
              <th className="border text-black border-gray-200 p-2">Author</th>
              <th className="border text-black border-gray-200 p-2">Posted Date</th>
              <th className="border text-black border-gray-200 p-2">Status</th>
              <th className="border text-black border-gray-200 p-2">Publisher</th>
              <th className="border text-black border-gray-200 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id} className="hover:bg-orange-200 hover:text-black">
                <td className="border border-gray-200 p-2">{article.title}</td>
                <td className="border border-gray-200 p-2">
                  <div className="flex items-center space-x-3">
                    <img src={article.author.photo} alt={article.author.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-medium">Name: {article.author.name}</p>
                      <p className="text-sm">Email: {article.author.email}</p>
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
                  <button
                    className="btn btn-sm hover:bg-green-400 btn-success w-full"
                    onClick={() => onApprove(article._id)}
                    disabled={article.status === "approved"}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-sm btn-error w-full"
                    onClick={() => {
                      setSelectedArticleId(article._id);
                      document.getElementById("decline_modal").showModal();
                    }}
                    disabled={article.status === "declined"}
                  >
                    Decline
                  </button>

                  <button
                    className="btn btn-sm btn-outline w-full"
                    onClick={() => onDelete(article._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-sm btn-info w-full"
                    onClick={() => onMakePremium(article._id)}
                    disabled={article.isPremium}
                  >
                    {article.isPremium ? "Premium" : "Make Premium"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dialog id="decline_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Why are you declining this?</h3>
            <form method="dialog" className="w-full">
              <textarea
                className="textarea textarea-bordered w-full my-3"
                placeholder="Write your reason here"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => {
                    if (selectedArticleId&&reason) {
                      onDecline(selectedArticleId);
                    }
                  }}
                >
                  Confirm Decline
                </button>
                <button className="btn">Close</button>
              </div>
            </form>
          </div>
        </dialog>

        <div className="pagination mt-6">
          <p>Current Page: {currentPage}</p>
          <button className="btn mr-1" onClick={handlePrevPage}>
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "btn mr-1 selected" : "btn mr-1"}
            >
              {page}
            </button>
          ))}
          <button className="btn ml-1" onClick={handleNextPage}>
            Next
          </button>
          <select value={usersPerPage} className="btn" onChange={handleUsersPerPage}>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AdminAllArticles;
