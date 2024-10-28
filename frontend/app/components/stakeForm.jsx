import React, { useState } from 'react';

const StakeForm = ({ onSubmit }) => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeDuration, setStakeDuration] = useState('30');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ amount: stakeAmount, duration: stakeDuration });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Stake CCD</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label 
            htmlFor="amount" 
            className="block text-gray-700 font-bold mb-2"
          >
            Amount (CCD)
          </label>
          <input
            id="amount"
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount to stake"
            required
          />
        </div>

        <div className="space-y-2">
          <label 
            htmlFor="duration" 
            className="block text-gray-700 font-bold mb-2"
          >
            Duration (Days)
          </label>
          <select
            id="duration"
            value={stakeDuration}
            onChange={(e) => setStakeDuration(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="30">30 days</option>
            <option value="90">90 days</option>
            <option value="180">180 days</option>
            <option value="365">365 days</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Stake
        </button>
      </form>
    </div>
  );
};

export default StakeForm;