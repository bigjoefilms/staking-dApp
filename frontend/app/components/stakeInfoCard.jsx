import React, { useState, useEffect } from 'react';

const StakeInfoCard = () => {
  // State management
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [stakeData, setStakeData] = useState({
    amount: 0,
    accumulatedReward: 0,
    duration: 0,
    startTime: null
  });
  const [isMounted, setIsMounted] = useState(false);

  // Initialize client-side only data after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
    // Simulate loading stake data after wallet connection
    setStakeData({
      amount: 1000,
      accumulatedReward: 50,
      duration: 90 * 24 * 60 * 60 * 1000, // 90 days in milliseconds
      startTime: new Date('2023-01-01').getTime()
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const StakeMetric = ({ label, value }) => (
    <div>
      <p className="text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  const LoadingPlaceholder = () => (
    <div className="text-center py-8">
      <p className="text-gray-500 text-lg">
        Connect wallet to view your CCD staking history
      </p>
      <div className="mt-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );

  const StakeMetrics = () => (
    <div className="grid grid-cols-2 gap-4">
      <StakeMetric 
        label="Staked Amount" 
        value={`${stakeData.amount} CCD`} 
      />
      <StakeMetric 
        label="Accumulated Reward" 
        value={`${stakeData.accumulatedReward} CCD`} 
      />
      <StakeMetric 
        label="Staking Duration" 
        value={`${stakeData.duration / (24 * 60 * 60 * 1000)} days`} 
      />
      <StakeMetric 
        label="Start Date" 
        value={formatDate(stakeData.startTime)} 
      />
    </div>
  );

  if (!isMounted) {
    return <LoadingPlaceholder />;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Your Stake</h2>
        {!isWalletConnected ? (
          <button
            onClick={handleConnectWallet}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Connect Wallet
          </button>
        ) : (
          <span className="text-green-500 font-semibold">
            Wallet Connected
          </span>
        )}
      </div>

      {!isWalletConnected ? <LoadingPlaceholder /> : <StakeMetrics />}
    </div>
  );
};

export default StakeInfoCard;