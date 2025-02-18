import React from 'react';
import { Link } from 'react-router-dom';
import useSubscription from '../../Hooks/useSubscription';

const PremiumCard = ({ premiumArticle }) => {
  // console.log(premiumArticle);

  const [hasSubscription,refetch]=useSubscription()

  const isPremiumUser=hasSubscription.premiumTaken



  const { _id, description, image, publisher, title,isPremium } = premiumArticle
  return (
    <div className="card card-compact bg-gradient-to-r from-yellow-500  to-orange-500 shadow-xl">
      {/* Premium Badge */}
      {isPremium && (
        <span className="badge bg-red-500 text-white uppercase absolute top-4 right-4">
          Premium
        </span>
      )}

      <figure>
        <img
          src={image}
          alt='premium img' />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Title: {title}</h2>
        <p><span className='font-semibold'>Description:</span> {description.length > 100 ? description.substring(0, 80) + '...' : description}</p>
         <p className="text-sm font-semibold">Published by: {publisher}</p>
        <div className="card-actions justify-end">

        {isPremiumUser?<Link  className='w-full' to={`/articleDetails/${_id}`}>
            
            <button className={`btn w-full bg-black text-white`}>Details</button>
          </Link>:<Link  className='w-full'>
            
            <button disabled className={`btn w-full bg-black text-white`}>Details</button>
          </Link>}
          
        </div>
      </div>
    </div>
  );
};

export default PremiumCard;