import React from 'react';
import { Link } from 'react-router-dom';

const ArticlesCard = ({ article }) => {
  const {_id,title,tags,publisher,image,description}=article
  // console.log(tags);
  return (
    <div className="card w-full bg-base-100 shadow-md border rounded-md p-4">
      {/* Article Image */}
      <figure>
        <img
          src={image}
          alt={title}
          className="rounded-md object-cover h-48 w-full"
        />
      </figure>

      {/* Article Content */}
      <div className="card-body p-4">
        {/* Title */}
        <h2 className="card-title text-lg font-semibold"><strong>Title:</strong> {title}</h2>

        {/* Publisher */}
        <p className="  mb-2"><span className='font-semibold'>Published by:</span> {publisher}</p>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-2"><span className='font-semibold'>Description:</span> {description}</p>

        {/* Details Button */}
        <div className="mt-4">
          <Link 
            to='/articleDetails'
            className="btn  w-full bg-orange-400"
            
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticlesCard;