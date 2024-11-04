import {
  CONTRACT_NAME,
  MAX_CONTRACT_EXECUTION_ENERGY,
  MICRO_CCD,
} from "@/config";
import { useStateProvider } from "@/provider/StateProvider";
import { useWallet } from "@/provider/WalletProvider";
import { formatDate, formatTime } from "@/utils/utils";
import {
  AccountAddress,
  ConcordiumGRPCClient,
  ContractAddress,
  ContractName,
  deserializeReceiveReturnValue,
  Energy,
  EntrypointName,
  Parameter,
  ReceiveName,
  SchemaVersion,
  serializeUpdateContractParameters,
} from "@concordium/web-sdk";
import React, { useState, useEffect } from "react";

const StakeInfoCard = () => {
  // State management
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [stakeData, setStakeData] = useState({
    amount: 0,
    accumulatedReward: 0,
    duration: 0,
    startTime: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  const { connect, account, contract, rpc } = useWallet();
  const { setStakerInfo } = useStateProvider();

  // Initialize client-side only data after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // const handleConnectWallet = () => {
  //   connect;
  //   setIsWalletConnected(true);
  //   // Simulate loading stake data after wallet connection
  //   setStakeData({
  //     amount: 1000,
  //     accumulatedReward: 50,
  //     duration: 90 * 24 * 60 * 60 * 1000, // 90 days in milliseconds
  //     startTime: new Date("2023-01-01").getTime(),
  //   });
  // };

  const getStakerInfo = async (
    rpc: ConcordiumGRPCClient,
    account: string,
    contract: any
  ) => {
    const receiveName = "view_staker_info";

    try {
      if (contract) {
        const contract_schema = await rpc?.getEmbeddedSchema(
          contract?.sourceModule
        );

        const serializedParameter = serializeUpdateContractParameters(
          ContractName.fromString(CONTRACT_NAME),
          EntrypointName.fromString(receiveName),
          account,
          contract_schema,
          SchemaVersion.V1
        );

        const result = await rpc?.invokeContract({
          contract: contract && ContractAddress?.create(contract?.index, 0),
          method:
            contract &&
            ReceiveName?.create(
              contract?.name,
              EntrypointName?.fromString(receiveName)
            ),
          energy: Energy.create(MAX_CONTRACT_EXECUTION_ENERGY),
          invoker: AccountAddress?.fromJSON(account),
          parameter: serializedParameter,
        });
        const buffer = Buffer.from(result.returnValue?.buffer as Uint8Array);
        const newschema = Buffer?.from(contract_schema).buffer;

        const name = ContractName?.fromString(CONTRACT_NAME);
        const entry_point = EntrypointName?.fromString(receiveName);

        const values = await deserializeReceiveReturnValue(
          buffer,
          contract_schema,
          name,
          entry_point,
          SchemaVersion?.V1
        );
        const data = values.Some[0];
        console.log(data);
        setStakerInfo(data);
        setStakeData({
          amount: Number(data.staked_amount) / MICRO_CCD,
          accumulatedReward: data.pending_rewards / MICRO_CCD,
          duration: 0,
          startTime: data.last_reward_timestamp,
        });

        return values as string;
      }
    } catch (err) {
      console.error("Error fetching staker info:", err);
      // toast.error("Error fetching products", {
      //   id: loading,
      // });
    }
  };

  useEffect(() => {
    getStakerInfo(rpc as ConcordiumGRPCClient, account, contract);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, contract, rpc]);

  // const formatDate = (timestamp: any) => {
  //   if (!timestamp) return "-";
  //   return new Date(timestamp).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };
  // const formatTime = (timestamp: any) => {
  //   if (!timestamp) return "-";
  //   return new Date(timestamp).toLocaleTimeString("en-US", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     // timeZoneName: "short",
  //   });
  // };

  const StakeMetric = ({ label, value }: any) => (
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
      <StakeMetric label="Staked Amount" value={`${stakeData.amount} CCD`} />
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
        value={`${formatDate(stakeData.startTime)}, ${formatTime(
          stakeData.startTime
        )}`}
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
        {!account ? (
          <button
            onClick={() => connect?.()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Connect Wallet
          </button>
        ) : (
          <span className="text-green-500 font-semibold">Wallet Connected</span>
        )}
      </div>

      {!account ? <LoadingPlaceholder /> : <StakeMetrics />}
    </div>
  );
};

export default StakeInfoCard;
