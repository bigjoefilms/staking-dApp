import React from 'react';

const StakingHeader = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-3">
        Concordium Staking
      </h1>
      <div className="flex flex-col items-center space-y-2">
        <p className="text-xl text-gray-600">
          Stake your{" "}
          <span className="font-mono font-semibold text-blue-600">
            $CCD
          </span>{" "}
          and get daily reward incentive
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-green-500 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Secure Staking</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-500 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Daily Rewards</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-purple-500 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>Easy to Use</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingHeader;