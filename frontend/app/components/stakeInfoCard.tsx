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
      const transaction = await connection?.signAndSendTransaction(
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
      const transaction = await connection?.signAndSendTransaction(
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

  const StakeMetric = ({ label, value }: any) => (
    <div>
      <p className="text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  const StakeMetrics = () => (
    <>
      {loadingUserStakeInfo ? (
        <div className="mt-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto "></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 ">
            <StakeMetric
              label="Staked Amount"
              value={`${stakeData.amount} CCD`}
            />

            <StakeMetric
              label="Start Date"
              value={`${formatDate(stakeData.startTime)}, ${formatTime(
                stakeData.startTime
              )}`}
            />
          </div>
          <div className="text-gray-600 mt-4">
            <p>Accumulated Reward</p>
            <div className="flex items-center justify-between w-full gap-5">
              <p className="text-2xl font-bold text-gray-800">{`${stakeData.accumulatedReward} CCD`}</p>
              <button
                onClick={() => claimRewards()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Staking Dashboard
          </h2>
          {!account ? (
            <button
              onClick={() => connect?.()}
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

        {!account ? <LoadingPlaceholder /> : <StakeMetrics />}
      </div>
      {stakerInfo && stakerInfo?.unbonding?.length >= 0 && (
        <div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-gray-700 ">
            <p className="text-2xl font-semibold mb-6">
              Awaiting unstake unbounding period
            </p>

            {!account ? (
              <LoadingPlaceholder />
            ) : (
              <>
                <div>
                  {stakerInfo?.unbonding.map((item, index) => {
                    return (
                      <div
                        key={Math.random()}
                        className="font-bold flex justify-between items-center border  p-3 mb-4"
                      >
                        {/* <div></div> */}
                        <div>
                          <p>
                            Amount to unstake: {Number(item.amount) / MICRO_CCD}{" "}
                            CCD
                          </p>
                          <p>
                            Time to Unlock:{" "}
                            {`${formatDate(item.unlock_time)}, ${formatTime(
                              item.unlock_time
                            )}`}
                          </p>
                        </div>

                        {/* <p
                          className={` ${
                            compareTimestamps(currentTime, item.unlock_time)
                              ? "text-green-300 "
                              : "text-gray-700"
                          } font-medium`}
                        >
                          {compareTimestamps(currentTime, item.unlock_time)
                            ? "Completed"
                            : "Awaiting..."}
                        </p> */}
                        <button
                          disabled={currentTime !== item.unlock_time}
                          className={` ${
                            currentTime !== item.unlock_time
                              ? "bg-blue-200"
                              : "bg-blue-500 hover:bg-blue-600"
                          } text-white font-bold py-2 px-4 rounded`}
                          // className="w-ful bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            completeUnstake();
                          }}
                        >
                          Complete Unstake
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Image src={Info} alt="Info" className="w-[15px]" />
                  <p className="text-sm">
                    This action finalizes the unstake process once the unbonding
                    period has concluded.
                  </p>
                </div>
                {/* <button
                  // disabled={currentTime !== item.unlock_time}
                  // className={` ${
                  //   currentTime !== item.unlock_time
                  //     ? "bg-blue-200"
                  //     : "bg-blue-500 hover:bg-blue-600"
                  // } text-white font-bold py-2 px-4 rounded`}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    completeUnstake();
                  }}
                >
                  Complete Unstake
                </button> */}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StakeInfoCard;
