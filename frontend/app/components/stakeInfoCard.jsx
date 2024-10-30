import React, { useState, useEffect } from 'react';

const LoadingPlaceholder = () => (
  <div className="text-center py-8">
    <p className="text-gray-500 text-lg">
      Loading staking information...
    </p>
    <div className="mt-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </div>
  </div>
);

const StakeInfoCard = () => {
  // State management
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [stakeData, setStakeData] = useState({
    amount: 0,
    accumulatedReward: 0,
    duration: 0,
    startTime: null,
    isStakingPeriodComplete: false,
    // Add dummy stakes array to demonstrate multiple stakes
    stakes: []
  });
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      duration: 90 * 24 * 60 * 60 * 1000,
      startTime: new Date('2024-01-01').getTime(),
      isStakingPeriodComplete: false,
      // Dummy stakes data
      stakes: [
        {
          id: 1,
          amount: 1000,
          accumulatedReward: 50,
          duration: 90,
          startTime: new Date('2024-01-01').getTime(),
          isComplete: false
        },
        {
          id: 2,
          amount: 2000,
          accumulatedReward: 150,
          duration: 180,
          startTime: new Date('2023-12-01').getTime(),
          isComplete: true
        },
        {
          id: 3,
          amount: 500,
          accumulatedReward: 25,
          duration: 30,
          startTime: new Date('2024-02-01').getTime(),
          isComplete: false
        }
      ]
    });
  };

  const handleUnstake = async (stakeId) => {
    try {
      setIsLoading(true);
      console.log('Unstaking stake ID:', stakeId);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update stakes array to remove unstaked position
      setStakeData(prev => ({
        ...prev,
        stakes: prev.stakes.filter(stake => stake.id !== stakeId)
      }));
    } catch (error) {
      console.error('Error unstaking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimRewards = async (stakeId) => {
    try {
      setIsLoading(true);
      console.log('Claiming rewards for stake ID:', stakeId);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update accumulated rewards for specific stake
      setStakeData(prev => ({
        ...prev,
        stakes: prev.stakes.map(stake => 
          stake.id === stakeId 
            ? { ...stake, accumulatedReward: 0 }
            : stake
        )
      }));
    } catch (error) {
      console.error('Error claiming rewards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const StakeCard = ({ stake }) => {
    const endTime = new Date(stake.startTime + (stake.duration * 24 * 60 * 60 * 1000));
    const isComplete = new Date() >= endTime;

    return (
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Staked Amount</p>
            <p className="text-xl font-bold text-gray-800">{stake.amount} CCD</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Accumulated Reward</p>
            <p className="text-xl font-bold text-gray-800">{stake.accumulatedReward} CCD</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="text-xl font-bold text-gray-800">{stake.duration} days</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Start Date</p>
            <p className="text-xl font-bold text-gray-800">{formatDate(stake.startTime)}</p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-600">
              {isComplete 
                ? "Staking period complete"
                : `Ends on ${formatDate(endTime)}`
              }
            </p>
            <span className={`px-2 py-1 rounded text-sm ${
              isComplete ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {isComplete ? 'Complete' : 'Active'}
            </span>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => handleUnstake(stake.id)}
              disabled={!isComplete || isLoading}
              className={`flex-1 py-2 px-4 rounded font-bold ${
                isComplete && !isLoading
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Processing...' : 'Unstake'}
            </button>
            <button
              onClick={() => handleClaimRewards(stake.id)}
              disabled={!isComplete || isLoading || stake.accumulatedReward === 0}
              className={`flex-1 py-2 px-4 rounded font-bold ${
                isComplete && !isLoading && stake.accumulatedReward > 0
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Processing...' : 'Claim Rewards'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const StakesList = () => (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Stakes</h3>
      {stakeData.stakes.map(stake => (
        <StakeCard key={stake.id} stake={stake} />
      ))}
    </div>
  );

  if (!isMounted) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <LoadingPlaceholder />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Staking Dashboard</h2>
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

      {!isWalletConnected ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            Connect wallet to view your CCD staking positions
          </p>
        </div>
      ) : (
        <StakesList />
      )}
    </div>
  );
};

export default StakeInfoCard;