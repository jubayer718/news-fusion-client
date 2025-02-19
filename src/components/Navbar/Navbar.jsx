import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UseAuth from '../../Hooks/UseAuth';
import useAdmin from '../../Hooks/useAdmin';
import './nav.css'
import { FaCloudMoon } from 'react-icons/fa';
import { IoIosSunny } from 'react-icons/io';

const Navbar = () => {
  const { user, handleLogOut } = UseAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
 // State to track the current theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    // Apply the theme to the <html> element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Save the theme to local storage
  }, [theme]);
    // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  // const isAdmin = true;
  const navOption = <>
    <li><NavLink to='/'>Home</NavLink></li>
    
    <li><NavLink to='/allArticle'>All Articles</NavLink></li>

    {user && (<li><NavLink to='/addArticles'>Add Articles</NavLink></li>
    )}

    {user && (<li><NavLink to='/subscription'>Subscription</NavLink></li>
    )}

    {user && (<li><NavLink to='/myArticles'>My Articles</NavLink></li>
    )}

    {user && (<li><NavLink to='/premiumArticles'>Premium Articles</NavLink></li>
    )}    {/* done: use condition for dashboard */}
    {isAdmin && (<li><NavLink to='/dashboard/adminHome'>Dashboard</NavLink></li>)}

  </>
  return (
    <div className="lg:px-12 md:px-12 fixed z-50 top-0 bg-orange-200 navbar ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {
              navOption
            }
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold text-gray-800"><span className='text-orange-600'>News</span>Fusion</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal  gap-4 px-1 text-black">
          {navOption}
           <button onClick={toggleTheme}>
            {theme === "light" ? <FaCloudMoon /> : <IoIosSunny />}
          </button>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className='dropdown text-black dropdown-end z-50'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div title={user?.displayName} className='w-10 rounded-full'>
                <img
                  referrerPolicy='no-referrer'
                  alt='User Profile Photo'
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li><NavLink to='myProfile'>profile</NavLink></li>
              <li className='mt-2'>
                <button
                  onClick={handleLogOut}
                  className='bg-gray-200 block text-center'
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : <Link className='font-bold btn' to='/login'>Login</Link>}
      </div>
    </div>
  );
};

export default Navbar;