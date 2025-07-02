import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion, easeIn } from "motion/react";

const StatisticsPage = () => {
  const [allUsersCount, setAllUsersCount] = useState(0);
  const [normalUsersCount, setNormalUsersCount] = useState(0);
  const [premiumUsersCount, setPremiumUsersCount] = useState(0);

  // Fetch users data
  useEffect(() => {
    fetch("https://newsfusion-server.vercel.app/statistics") // Replace with your backend API endpoint
      .then((res) => res.json())
      .then((data) => {
        const allUsers = data.length;
        const premiumUsers = data.filter((user) => user.premiumTaken).length;
        const normalUsers = allUsers - premiumUsers;

        setAllUsersCount(allUsers);
        setNormalUsersCount(normalUsers);
        setPremiumUsersCount(premiumUsers);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <motion.h1

        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: easeIn } }}
        className="text-3xl font-bold text-center mb-8">User Statistics</motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 2, ease: easeIn } }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* All Users */}
        <div className=" shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">All Users</h2>
          <p className="text-4xl font-extrabold text-blue-600">
            <CountUp start={0} end={allUsersCount} duration={2.5} />
          </p>
        </div>

        {/* Normal Users */}
        <div className=" shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Normal Users</h2>
          <p className="text-4xl font-extrabold text-green-600">
            <CountUp start={0} end={normalUsersCount} duration={2.5} />
          </p>
        </div>

        {/* Premium Users */}
        <div className=" shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Premium Users</h2>
          <p className="text-4xl font-extrabold text-orange-600">
            <CountUp start={0} end={premiumUsersCount} duration={2.5} />
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default StatisticsPage;
