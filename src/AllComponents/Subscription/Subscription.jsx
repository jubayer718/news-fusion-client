import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { easeIn, motion } from 'motion/react';

const Subscription = () => {
  const [subscriptionPeriod, setSubscriptionPeriod] = useState('');
  const navigate = useNavigate();

  const handleSubscriptionChange = (e) => {
    setSubscriptionPeriod(e.target.value);
  };

 // Subscription periods and prices
  const subscriptionOptions = [
    { value: '1-minute', label: '1 Minute', price: 1 }, 
    { value: '5-days', label: '5 Days', price: 5 },
    { value: '10-days', label: '10 Days', price: 10 },
  ];

  const handleSubscribe = () => {
    if (!subscriptionPeriod) {
      alert('Please select a subscription period');
      return;
    }
    const selectOption=subscriptionOptions.find((option)=>option.value===subscriptionPeriod)
     // Navigate to payment page with subscription details
    navigate('/payment', { state: { subscriptionPeriod,price:selectOption.price } });
  };

  return (
    <motion.div initial={{ opacity:0}} animate={{opacity:1, transition:{duration:2, ease:easeIn}}} className="min-h-screen flex flex-col items-center p-6 mt-16">
      {/* Attractive Banner */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Become a Premium Member!</h1>
        <p className="text-lg">
          Get exclusive access to premium content and unlock additional features. Choose the best plan
          that fits your needs!
        </p>
      </div>

      {/* Subscription Form */}
      <div className="mt-10 w-full max-w-md  rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Choose Your Subscription Plan</h2>
        <label className="block  text-sm font-bold mb-2">
          Subscription Period
        </label>
        <select
          value={subscriptionPeriod}
          onChange={handleSubscriptionChange}
          className="block w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a period</option>
          {/* <option value="1-minute">1 Minute (Free for Testing)</option>
          <option value="5-days">5 Days - $5</option>
          <option value="10-days">10 Days - $10</option> */}
          {
            subscriptionOptions.map((option)=> <option key={option.value} value={option.value}> {option.label} - ${option.price}</option>)
          }
        </select>

        <button
          onClick={handleSubscribe}
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded shadow-lg"
        >
          Subscribe Now
        </button>
      </div>
    </motion.div>
  )
}

export default Subscription