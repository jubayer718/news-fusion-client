import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useSubscription from '../../Hooks/useSubscription';
import { useTheme } from '../../Provider/ThemeProvider/ThemeProvider';

const PremiumCard = ({ premiumArticle }) => {
  // console.log(premiumArticle);

  const [hasSubscription,refetch]=useSubscription()
  const {theme}=useTheme()  

  const isPremiumUser=hasSubscription.premiumTaken



  const { _id, description, image, publisher, title, isPremium } = premiumArticle
  useEffect(()=>{refetch()},[theme])
  return (
    <div className={`card card-compact rounded-xl ${theme==='dark'?'bg-transparent border':'bg-gradient-to-r from-yellow-500  to-orange-500'} shadow-xl `}>
      {/* Premium Badge */}
      {isPremium && (
        <span className="badge bg-red-500 text-white uppercase absolute top-4 right-4">
          Premium
        </span>
      )}

      <figure className='p-2'>
        <img
          className='h-44 w-full'
          src={image}
          alt='premium img' />
      </figure>
      <div className="card-body">
        <h2 className={`card-title ${theme==='dark'?'text-white':'text-[#30336b]'}`}>Title: {title}</h2>
        <p className={`${theme==='dark'?'text-white':'text-[#30336b]'}`}><span className='font-semibold'>Description:</span> {description.length > 100 ? description.substring(0, 80) + '...' : description}</p>
        <p className={`text-sm font-semibold ${theme==='dark'?'text-white':'text-[#30336b]'}`}>Published by: {publisher}</p>
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