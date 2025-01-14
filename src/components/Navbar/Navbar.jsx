import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {


  const navOption = <>
  <li><NavLink to='/'>Home</NavLink></li>
  <li><NavLink to='/addArticles'>Add Articles</NavLink></li>
  <li><NavLink to='/allArticles'>All Articles</NavLink></li>
    <li><NavLink to='/subscription'>Subscription</NavLink></li>
    {/* TODO: use condition for dashboard */}
  <li><NavLink>Dashboard</NavLink></li>
  <li><NavLink to='/myArticles'>My Articles</NavLink></li>
  <li><NavLink to='/premiumArticles'>Premium Articles</NavLink></li>
 
  </>
  return (
    <div className="px-4 bg-orange-200 navbar ">
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
    <ul className="menu menu-horizontal gap-2 px-1">
    {navOption}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">user Photo</a>
  </div>
</div>
  );
};

export default Navbar;