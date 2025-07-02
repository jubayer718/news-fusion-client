
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-2">
     
      <div className="container mx-auto px-4 py-10 space-y-10">
        {/* Logo and About Section */}
        <div className="flex flex-wrap justify-between  space-y-6">
          <div className="w-full md:w-1/3 flex flex-col items-start">
            <h2 className="text-3xl font-bold text-orange-600 mt-5">News Fusion</h2>
            <p className="text-gray-300 mt-2 md:w-56 lg:w-96 w-96">
              Your one-stop destination for the latest news, trends, and updates across the globe. Stay informed, stay ahead.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-around w-full md:w-2/3">
            <nav className="w-1/3">
              <h6 className="text-lg font-semibold text-orange-500 mb-4">Services</h6>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-400">Breaking News</a></li>
                <li><a href="#" className="hover:text-orange-400">Editorials</a></li>
                <li><a href="#" className="hover:text-orange-400">Daily Updates</a></li>
                <li><a href="#" className="hover:text-orange-400">Exclusive Interviews</a></li>
              </ul>
            </nav>
            <nav className="w-1/3">
              <h6 className="text-lg font-semibold text-orange-500 mb-4">Company</h6>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-400">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400">Our Team</a></li>
                <li><a href="#" className="hover:text-orange-400">Careers</a></li>
                <li><a href="#" className="hover:text-orange-400">Press</a></li>
              </ul>
            </nav>
            <nav className="w-1/3">
              <h6 className="text-lg font-semibold text-orange-500 mb-4">Legal</h6>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-400">Terms of Use</a></li>
                <li><a href="#" className="hover:text-orange-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-orange-400">Disclaimer</a></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-gray-700 pt-6 ">
          <p className="text-sm text-center text-gray-400">
            &copy; {new Date().getFullYear()} News Fusion. All rights reserved.
          </p>
          {/* <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-orange-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400">
              <i className="fab fa-instagram"></i>
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
