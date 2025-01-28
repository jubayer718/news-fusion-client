import React from 'react';

const Footer = () => {
  return (
    <div>
    
      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>&copy; {new Date().getFullYear()} My Publications. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;