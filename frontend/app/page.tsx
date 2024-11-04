"use client";
import ProtocolStats from "./components/protocolStats";
import StakeInfoCard from "./components/stakeInfoCard";
import StakeForm from "./components/stakeForm";
import StakeHeader from "./components/stakeHeader";

export default function Home() {
  const handleStakeSubmit = ({ amount, duration }: any) => {
    // Handle the staking logic here
    console.log("Staking amount:", amount, "for", duration, "days");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <StakeHeader />
        <ProtocolStats />
        <div className="mt-8">
          <StakeInfoCard />
        </div>
        <StakeForm onSubmit={handleStakeSubmit} />
      </main>
    </div>
  );
}
