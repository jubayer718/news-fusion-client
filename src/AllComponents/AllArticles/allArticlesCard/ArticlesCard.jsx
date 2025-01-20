import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSubscription from '../../../Hooks/useSubscription';

const ArticlesCard = ({ article }) => {
  const { _id, title, tags, publisher, image, description, isPremium } = article;

  // const [hasSubscription, setHasSubscription] = useState(false);
  // console.log(tags);
  // const hasSubscription=true
  const [hasSubscription,refetch]=useSubscription()

  const isPremiumUser=hasSubscription.premiumTaken




  return (
      <div
      className={`card ${
        isPremium ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' : 'bg-white text-black'
      } shadow-xl p-4 rounded-lg border`}
    >
      {/* Premium Badge */}
      {isPremium && (
        <span className="badge bg-red-500 text-white uppercase absolute top-4 right-4">
          Premium
        </span>
      )}

      {/* Article Image */}
      <img
        src={image}
        alt={title}
        className={`w-full h-40 object-cover rounded-t-lg ${
          isPremium ? 'border-yellow-500' : 'border-gray-300'
        }`}
      />

      {/* Article Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold"><span>Title:</span> {title}</h2>
        <p className="text-sm mt-2 mb-4 font-semibold"><span >Description:</span> {description.length>100? description.slice(0,100)+'...':description}</p>
        <p className="text-sm font-semibold">Published by: {publisher}</p>
      </div>

      {/* Action Link */}
      <Link
        to={`/articleDetails/${_id}`}
      >
        <button
          disabled={isPremium && !isPremiumUser}
          
          className={`w-full py-2 mt-4 rounded ${
          isPremium && !isPremiumUser
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : isPremium
            ? 'bg-black text-white'
            : 'bg-blue-500 text-white'
        } hover:opacity-80`}>    {isPremium ? (isPremiumUser ? 'Read Premium' : 'Subscribe to Access') : 'Read More'}</button>
      
      </Link>
    </div>
  );
};

export default ArticlesCard;