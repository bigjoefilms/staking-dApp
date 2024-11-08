import React from "react";

const LoadingPlaceholder = () => {
  return (
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
};

export default LoadingPlaceholder;
