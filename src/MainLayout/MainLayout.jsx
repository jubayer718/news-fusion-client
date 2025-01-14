import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <div>
      {/* navbar */}
      <Navbar></Navbar>

      {/* main */}
      <Outlet></Outlet>
      
      {/* footer */}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;