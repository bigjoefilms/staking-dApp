"use client";
import ProtocolStats from "./components/protocolStats";
import StakeInfoCard from "./components/stakeInfoCard";
import StakeForm from "./components/stakeForm";
import StakeHeader from "./components/stakeHeader";
import FundContract from "./components/FundContract";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <StakeHeader />
        <FundContract />
        <ProtocolStats />
        <div className="mt-8">
          <StakeInfoCard />
        </div>
        <StakeForm />
      </main>
    </div>
  );
}
