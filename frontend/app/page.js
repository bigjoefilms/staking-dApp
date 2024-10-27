"use client";
import { useState, useEffect } from "react";

// Mock data - moved outside component to avoid regeneration
const mockTotalStaked = 10000;

// Helper function to format date consistently
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakeDuration, setStakeDuration] = useState("30");
  // Use null as initial state for client-side only data
  const [stakeData, setStakeData] = useState(null);
  // Add mounted state to handle client-side rendering
  const [isMounted, setIsMounted] = useState(false);

  // Initialize client-side only data after mount
  useEffect(() => {
    setIsMounted(true);
    setStakeData({
      amount: 1000,
      tokenType: "CCD",
      startTime: "2023-01-01",
      duration: 90 * 24 * 60 * 60 * 1000, // 90 days in milliseconds
      accumulatedReward: 50,
    });
  }, []);

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  const handleStake = (e) => {
    e.preventDefault();
    console.log("Staking", stakeAmount, "CCD for", stakeDuration, "days");
  };

  // Don't render until client-side hydration is complete
  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Concordium Staking dApp
        </h1>

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

          {!isWalletConnected ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                Connect wallet to view your CCD staking history
              </p>
              <div className="mt-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Staked Amount</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stakeData?.amount} CCD
                </p>
              </div>
              <div>
                <p className="text-gray-600">Accumulated Reward</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stakeData?.accumulatedReward} CCD
                </p>
              </div>
              <div>
                <p className="text-gray-600">Staking Duration</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stakeData?.duration / (24 * 60 * 60 * 1000)} days
                </p>
              </div>
              <div>
                <p className="text-gray-600">Start Date</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stakeData?.startTime && formatDate(stakeData.startTime)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Stake CCD
          </h2>
          <form onSubmit={handleStake}>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-gray-700 font-bold mb-2"
              >
                Amount (CCD)
              </label>
              <input
                type="number"
                id="amount"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount to stake"
                required
              />
            </div>
            <div className="mb-4">
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

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Total Staked
          </h2>
          <p className="text-3xl font-bold text-gray-800">
            {mockTotalStaked} CCD
          </p>
        </div>
      </main>
    </div>
  );
}
