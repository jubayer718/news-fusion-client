import { Link, NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 w-11/12 mx-auto">
      <div>
        <ul className="menu bg-orange-400 min-h-screen  w-56">
  <li className="menu-title">Admin </li>
  <li><NavLink to='/dashboard/adminHome'>Dashboard</NavLink></li>
  <li><NavLink to='/dashboard/allUsers'>All Users</NavLink></li>
  <li><NavLink to='/dashboard/allArticles'>All Articles</NavLink></li>
          <li><NavLink to='/dashboard/addPublishers'>Add Publisher</NavLink></li>
          <li><NavLink to='/dashboard/overview'>Overview</NavLink></li>
          <div className="divider my-3"></div>
          <li><Link to='/'>Home</Link></li>
</ul>
      </div>
      <div className="flex-1 mt-5">

        <Outlet></Outlet>
      </div>
  </div>
  );
};

export default Dashboard;