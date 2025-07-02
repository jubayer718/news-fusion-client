import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import axios from "axios";


const OverviewPage = () => {
    const [stats, setStats] = useState({ users: 100, premiumUsers: 400, articles:500, views: 6000 });
  const [userGrowth, setUserGrowth] = useState([
    { month: "January", users: 500 },
    { month: "February", users: 750 },
    { month: "March", users: 900 },
    { month: "April", users: 1200 },
    { month: "May", users: 1350 }


]);
  const [categoryData, setCategoryData] = useState([  { category: "Business", count: 40 },
    { category: "Health", count: 30 },
    { category: "Technology", count: 25 },
    { category: "Entertainment", count: 20 },
    { category: "Sports", count: 15 }]);

  // useEffect(() => {
  //   // Fetch overall stats
  //   axios.get("https://newsfusion-server.vercel.app/dashboard/stats").then((res) => setStats(res.data));
  //   // Fetch user growth data
  //   axios.get("https://newsfusion-server.vercel.app/dashboard/user-growth").then((res) => setUserGrowth(res.data));
  //   // Fetch category distribution data
  //   axios.get("https://newsfusion-server.vercel.app/dashboard/category-distribution").then((res) => setCategoryData(res.data));
  // }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4567"];

  return (
    <div className="p-6  min-h-screen">
      <h2 className="text-3xl font-bold mb-6">📊 Dashboard Overview</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Users", value: stats.users },
          { label: "Premium Users", value: stats.premiumUsers },
          { label: "Total Articles", value: stats.articles },
          { label: "Total Views", value: stats.views },
        ].map((stat, index) => (
          <div key={index} className=" p-6 shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold">{stat.label}</h3>
            <CountUp className="text-3xl font-bold text-blue-600" end={stat.value} duration={3} separator="," />
          </div>
        ))}
      </div>

      {/* User Growth Chart */}
      <div className=" p-6 shadow-md rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">📈 User Growth Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userGrowth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution Pie Chart */}
      <div className=" p-6 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-4">🕵️‍♂️ Top Categories</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categoryData} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewPage;