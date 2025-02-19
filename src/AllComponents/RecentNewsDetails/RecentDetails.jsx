import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';

const RecentDetails = () => {
  const article = useLoaderData();
// const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  //   // Apply the theme to the <html> element
  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme); // Save the theme to local storage
  // }, [theme]);
  return (
    <div
      className={`min-h-screen py-10 px-4 lg:px-24 transition-all duration-300 mt-8`}
    >
      {/* News Card */}
      <div
        className={`max-w-4xl mx-auto p-6 rounded-lg shadow-md transition-all duration-300  
        `}
      >
        {/* News Image */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        {/* Title */}
        <h1 className="text-3xl font-bold mb-3">{article.title}</h1>

        {/* Publisher & Date */}
        <p className="text-sm mb-2">
          Published by{" "}
          <span className="font-semibold text-orange-500">{article.publisher}</span>{" "}
          on {new Date(article.postedDate).toDateString()}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={article.author.photo}
            alt={article.author.name}
            className="w-10 h-10 rounded-full"
          />
          <p className="font-semibold">{article.author.name}</p>
        </div>

        {/* Description */}
        <p className="leading-relaxed mb-4">{article.description}</p>

        {/* View Count */}
        <div className="flex items-center gap-2 text-sm">
          <FaEye className="text-gray-400" />
          <span>{article.viewCount} Views</span>
        </div>
      </div>
    </div>
  );
};

export default RecentDetails;