import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSubscription from '../../../Hooks/useSubscription';
import { useTheme } from '../../../Provider/ThemeProvider/ThemeProvider';

const ArticlesCard = ({ article }) => {
  const { _id, title, tags, publisher, image, description, isPremium } = article;
  const { theme } = useTheme()

  // const [hasSubscription, setHasSubscription] = useState(false);
  // console.log(tags);
  // const hasSubscription=true
  const [hasSubscription, refetch] = useSubscription()

  const isPremiumUser = hasSubscription.premiumTaken




  const isDark = theme === 'dark';

  const cardTitleColor = isDark ? 'text-white' : 'text-gray-900';
  const descriptionColor = isDark ? 'text-[#3c6382]' : 'text-gray-700';
  const publisherColor = isDark ? 'text-[#3c6382]' : 'text-gray-600';
  const cardBg = isPremium
    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
    : isDark
      ? 'bg-gray-900 text-white'
      : 'bg-white text-black';
  const borderColor = isPremium
    ? 'border-yellow-500'
    : isDark
      ? 'border-gray-600'
      : 'border-gray-300';

  const buttonBase =
    'w-full py-2 mt-4 rounded hover:opacity-80 transition-all';

  let buttonClass = '';

  if (isPremium && !isPremiumUser) {
    buttonClass = 'bg-gray-300 text-gray-600 cursor-not-allowed';
  } else if (isPremium) {
    buttonClass = 'bg-black text-white';
  } else {
    buttonClass = isDark ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white';
  }
  return (
    <div
      className={`card ${cardBg} shadow-xl p-4 rounded-lg border ${borderColor}`}
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
        className={`w-full h-40 object-cover rounded-t-lg ${isPremium ? 'border-yellow-500' : 'border-gray-300'
          }`}
      />

      {/* Article Content */}
      <div className="p-4">
        <h2 className={`text-xl font-bold ${cardTitleColor}`}><span>Title:</span> {title}</h2>
        <p className={`text-sm mt-2 mb-4 font-semibold ${descriptionColor}`}>
          <span>Description:</span> {description.length > 100 ? description.slice(0, 100) + '...' : description}
        </p>
        <p className={`text-sm font-semibold ${publisherColor}`}>Published by: {publisher}</p>
      </div>

      {/* Action Link */}
      <Link
        to={`/articleDetails/${_id}`}
      >
        <button
          disabled={isPremium && !isPremiumUser}
          className={`${buttonBase} ${buttonClass}`}
        >
          {isPremium ? (isPremiumUser ? 'Read Premium' : 'Subscribe to Access') : 'Read More'}
        </button>

      </Link>
    </div>
  );
};

export default ArticlesCard;