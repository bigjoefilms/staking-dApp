import {
  CONTRACT_NAME,
  MAX_CONTRACT_EXECUTION_ENERGY,
  MICRO_CCD,
} from "@/config";
import { useStateProvider } from "@/provider/StateProvider";
import { useWallet } from "@/provider/WalletProvider";
import {
  compareTimestamps,
  formatDate,
  formatTime,
  getCurrentDateTime,
} from "@/utils/utils";
import {
  AccountAddress,
  AccountTransactionType,
  CcdAmount,
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
import LoadingPlaceholder from "./LoadingPlaceholder";
import toast from "react-hot-toast";
import Image from "next/image";
import Info from "@/app/assets/info.png";

const StakeInfoCard = () => {
  // State management
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [stakeData, setStakeData] = useState({
    amount: 0,
    accumulatedReward: 0,
    duration: 0,
    startTime: 0,
  });
  const [loadingUserStakeInfo, setLoadingUserStakeInfo] = useState(false);

  const { connect, account, contract, rpc, connection } = useWallet();
  const { setStakerInfo, stakerInfo } = useStateProvider();

  const currentTime = getCurrentDateTime();

  const getStakerInfo = async (
    rpc: ConcordiumGRPCClient,
    account: string,
    contract: any
  ) => {
    const receiveName = "view_staker_info";

    try {
      setLoadingUserStakeInfo(true);
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
        console.log(values);
        const data = values?.Some[0] || values?.None[0];

        console.log("Extracted data:", data);

        if (data) {
          setStakerInfo(data);
          setStakeData({
            amount: Number(data.staked_amount) / MICRO_CCD,
            accumulatedReward: data.pending_rewards / MICRO_CCD,
            duration: 0,
            startTime: data.last_reward_timestamp,
          });
        } else {
          console.error("No data found in the deserialized response.");
        }
        setLoadingUserStakeInfo(false);
        toast.success("User Stake Information fetched successfully");
        return values as string;
      }
    } catch (err) {
      setLoadingUserStakeInfo(false);

      console.error("Error fetching user stake information:", err);
      toast.error("Error fetching user stake information");
    }
  };

  const completeUnstake = async () => {
    try {
      const transaction = connection?.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
          amount: CcdAmount.fromCcd(0),
          address: ContractAddress.create(contract.index, 0),
          receiveName: ReceiveName.create(
            contract.name,
            EntrypointName.fromString("complete_unstake")
          ),
          maxContractExecutionEnergy: Energy.create(
            MAX_CONTRACT_EXECUTION_ENERGY
          ),
        }
      );
      toast.success("Unstake successfully Completed");
      // transaction &&
      //   toast.success("Campaign successfully created", {
      //     id: loading,
      //   });
      // setTimeout(() => {
      //   // getProject();
      // }, 10000);
      return transaction;
    } catch (error) {
      toast.error("Error completing unstake");
      console.error(error);
    }
  };

  const claimRewards = async () => {
    // const loading = toast.loading("Creating campaign...");
    try {
      const transaction = connection?.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
          amount: CcdAmount.fromCcd(0),
          address: ContractAddress.create(contract.index, 0),
          receiveName: ReceiveName.create(
            contract.name,
            EntrypointName.fromString("claim_rewards")
          ),
          maxContractExecutionEnergy: Energy.create(
            MAX_CONTRACT_EXECUTION_ENERGY
          ),
        }
        // params
      );
      // transaction &&
      toast.success("Reward claimed successfully");
      // setTimeout(() => {
      //   // getProject();
      // }, 10000);
      return transaction;
    } catch (error) {
      toast.error("Error claiming rewards");
      console.error(error);
    }
  };

  useEffect(() => {
    getStakerInfo(rpc as ConcordiumGRPCClient, account, contract);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, rpc]);

  const StakeMetric = ({ label, value, icon }: any) => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
      <div className="flex items-center mb-3">
        <div className="p-2 bg-blue-100 rounded-lg mr-3">
          {icon}
        </div>
        <p className="text-gray-600 font-medium">{label}</p>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  const StakeMetrics = () => (
    <>
      {loadingUserStakeInfo ? (
        <div className="mt-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <StakeMetric
              label="Staked Amount"
              value={`${stakeData.amount} CCD`}
              icon={
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <StakeMetric
              label="Start Date"
              value={`${formatDate(stakeData.startTime)}, ${formatTime(stakeData.startTime)}`}
              icon={
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">Accumulated Reward</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-800">{`${stakeData.accumulatedReward} CCD`}</p>
              <button
                onClick={() => claimRewards()}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Claim Rewards
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700">Staking Dashboard</h2>
          </div>
          {!account ? (
            <button
              onClick={() => connect?.()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Connect Wallet
            </button>
          ) : (
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
              Wallet Connected
            </span>
          )}
        </div>

        {!account ? <LoadingPlaceholder /> : <StakeMetrics />}
      </div>

      {/* Unbonding Period Section */}
      {stakerInfo && stakerInfo?.unbonding?.length >= 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700">Unbonding Period</h2>
          </div>

          {!account ? (
            <LoadingPlaceholder />
          ) : (
            <>
              <div className="space-y-4">
                {stakerInfo?.unbonding.map((item: any) => (
                  <div
                    key={Math.random()}
                    className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-100"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-700 mb-2">
                          Amount to unstake: <span className="font-bold">{Number(item.amount) / MICRO_CCD} CCD</span>
                        </p>
                        <p className="text-gray-700">
                          Time to Unlock: <span className="font-bold">{`${formatDate(item.unlock_time)}, ${formatTime(item.unlock_time)}`}</span>
                        </p>
                      </div>
                      <button
                        disabled={currentTime !== item.unlock_time}
                        className={`${
                          currentTime !== item.unlock_time
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600"
                        } text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200`}
                        onClick={() => completeUnstake()}
                      >
                        Complete Unstake
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-6 p-4 bg-blue-50 rounded-lg">
                <Image src={Info} alt="Info" className="w-[15px]" />
                <p className="text-sm text-blue-800">
                  This action finalizes the unstake process once the unbonding period has concluded.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default StakeInfoCard;
