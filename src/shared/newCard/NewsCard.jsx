import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ id, title, image, description }) => {
  
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg ">
      {/* News Image */}
      <img className="w-full h-48 object-cover" src={image} alt={title} />

      {/* News Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-500">{title}</h2>
        <p className="text-gray-400 text-sm mt-2">
          {description.length > 100 ? description.slice(0, 100) + "..." : description}
        </p>

        {/* See More Button */}
        <Link to={`/recent/details/${id}`}>
         <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full">
          See More
        </button></Link>
      </div>
    </div>
  );
};

export default NewsCard;
