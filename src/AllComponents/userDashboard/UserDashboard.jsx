
import { NavLink, Outlet } from 'react-router-dom';


const UserDashboard = () => {

  return (
    <div className={`p-6 flex flex-col lg:flex-row gap-5  min-h-screen w-11/12 mx-auto `}>

      <div className=' bg-orange-400'>
        <ul className='menu space-y-2 text-black'>
          <li><NavLink to="/userDashboard/userProfile">Profile</NavLink></li>
          <li><NavLink to="/userDashboard/userOverview">Overview</NavLink></li>
        <div className='divider'></div>
        <li><NavLink to="/">Home</NavLink></li>
        </ul>
      </div>
      <div className=" flex-1 mx-auto  p-6 rounded-lg shadow-lg">
       <Outlet></Outlet>
      </div>
    </div>
  );
};

export default UserDashboard;