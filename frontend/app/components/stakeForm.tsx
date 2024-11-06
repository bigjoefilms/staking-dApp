import { MAX_CONTRACT_EXECUTION_ENERGY, MICRO_CCD } from "@/config";
import { useWallet } from "@/provider/WalletProvider";
import { moduleSchemaFromBase64 } from "@concordium/react-components";
import {
  AccountTransactionType,
  CcdAmount,
  ContractAddress,
  Energy,
  EntrypointName,
  ReceiveName,
} from "@concordium/web-sdk";
import Image from "next/image";
import React, { useState } from "react";
import Info from "@/app/assets/info.png";
import { useStateProvider } from "@/provider/StateProvider";
import {
  compareTimestamps,
  formatDate,
  formatTime,
  getCurrentDateTime,
} from "@/utils/utils";
import { it } from "node:test";

const StakeForm = ({ onSubmit }: any) => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakeDuration, setStakeDuration] = useState("30");
  const [activeOption, setActiveOption] = useState("stake");

  const { connection, account, contract, rpc } = useWallet();
  const { stakerInfo } = useStateProvider();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit?.({ amount: stakeAmount, duration: stakeDuration });
  };

  const currentTime = getCurrentDateTime();
  console.log(currentTime);

  const stake = async (amount: number) => {
    // const loading = toast.loading("Creating campaign...");
    try {
      // const schema = await rpc?.getEmbeddedSchema(contract?.sourceModule);

      // // convert schema to base64……..
      // const schemaToBase64 = btoa(
      //   new Uint8Array(schema).reduce(
      //     (data, byte) => data + String.fromCharCode(byte),
      //     ""
      //   )
      // );

      // create params……..
      // const params = {
      //   parameters: {
      //     name: newProject?.name,
      //     description: newProject?.description,
      //     location: newProject?.location,
      //     max_whitelisted_addresses: newProject?.maxWhitelistedAddresses,
      //   },
      //   schema: moduleSchemaFromBase64(schemaToBase64),
      // };

      const transaction = connection?.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
          amount: CcdAmount.fromCcd(amount),
          address: ContractAddress.create(contract.index, 0),
          receiveName: ReceiveName.create(
            contract.name,
            EntrypointName.fromString("stake")
          ),
          maxContractExecutionEnergy: Energy.create(
            MAX_CONTRACT_EXECUTION_ENERGY
          ),
        }
        // params
      );
      // toast.success("Campaign successfully created");
      // transaction &&
      //   toast.success("Campaign successfully created", {
      //     id: loading,
      //   });
      // setTimeout(() => {
      //   // getProject();
      // }, 10000);
      return transaction;
    } catch (error) {
      // toast.error("Error creating campaign", {
      //   id: loading,
      // });
      console.error(error);
    }
  };

  const initiateUnstake = async (amount: number) => {
    // const loading = toast.loading("Creating campaign...");
    try {
      const schema = await rpc?.getEmbeddedSchema(contract?.sourceModule);

      // convert schema to base64……..
      const schemaToBase64 = btoa(
        new Uint8Array(schema as Uint8Array).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      // create params……..
      const params = {
        parameters: {
          amount: JSON.stringify(amount * MICRO_CCD),
        },
        schema: moduleSchemaFromBase64(schemaToBase64),
      };

      const transaction = connection?.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
          amount: CcdAmount.fromCcd(0),
          address: ContractAddress.create(contract.index, 0),
          receiveName: ReceiveName.create(
            contract.name,
            EntrypointName.fromString("initiate_unstake")
          ),

          maxContractExecutionEnergy: Energy.create(
            MAX_CONTRACT_EXECUTION_ENERGY
          ),
        },
        params
      );
      // toast.success("Campaign successfully created");
      // transaction &&
      //   toast.success("Campaign successfully created", {
      //     id: loading,
      //   });
      // setTimeout(() => {
      //   // getProject();
      // }, 10000);
      return transaction;
    } catch (error) {
      // toast.error("Error creating campaign", {
      //   id: loading,
      // });
      console.error(error);
    }
  };

  const completeUnstake = async () => {
    // const loading = toast.loading("Creating campaign...");
    try {
      // const schema = await rpc?.getEmbeddedSchema(contract?.sourceModule);

      // // convert schema to base64……..
      // const schemaToBase64 = btoa(
      //   new Uint8Array(schema).reduce(
      //     (data, byte) => data + String.fromCharCode(byte),
      //     ""
      //   )
      // );

      // create params……..
      // const params = {
      //   parameters: {
      //     name: newProject?.name,
      //     description: newProject?.description,
      //     location: newProject?.location,
      //     max_whitelisted_addresses: newProject?.maxWhitelistedAddresses,
      //   },
      //   schema: moduleSchemaFromBase64(schemaToBase64),
      // };

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
        // params
      );
      // toast.success("Campaign successfully created");
      // transaction &&
      //   toast.success("Campaign successfully created", {
      //     id: loading,
      //   });
      // setTimeout(() => {
      //   // getProject();
      // }, 10000);
      return transaction;
    } catch (error) {
      // toast.error("Error creating campaign", {
      //   id: loading,
      // });
      console.error(error);
    }
  };
  return (
    <div className="text-gray-700">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-gray-700 ">
        <div className="flex items-center gap-5  w-full text-white mb-5">
          <button
            onClick={() => setActiveOption("stake")}
            className={`${
              activeOption == "stake"
                ? "bg-blue-500"
                : "border border-gray-400 text-gray-700"
            } rounded-md w-[50%] p-2 `}
          >
            Stake
          </button>
          <button
            onClick={() => setActiveOption("unstake")}
            className={`${
              activeOption === "unstake"
                ? " bg-blue-500"
                : "border border-gray-400 text-gray-700"
            } rounded-md w-[50%] p-2 `}
          >
            Unstake
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {activeOption === "stake" ? "Stake" : "Unstake"} CCD
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-gray-700 font-bold mb-2"
            >
              Amount (CCD)
            </label>
            <input
              id="amount"
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter amount to ${
                activeOption === "stake" ? "stake" : "unstake"
              }`}
              required
            />
          </div>
          {activeOption !== "stake" && (
            <div className="flex items-center gap-3">
              <Image src={Info} alt="Info" className="w-[15px]" />
              <p className="text-sm">There is a 1 day unbounding period</p>
            </div>
          )}
          {/* 
        <div className="space-y-2">
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
        </div> */}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              if (activeOption === "stake") {
                stake(Number(stakeAmount));
              } else {
                initiateUnstake(Number(stakeAmount));
              }
            }}
          >
            {activeOption === "stake" ? "Stake" : "Initiate Unstake"}
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-2xl font-semibold mb-6">
          Awaiting unstake unbounding period
        </p>
        <div>
          {stakerInfo?.unbonding.map((item, index) => {
            return (
              <div
                key={Math.random()}
                className="font-bold flex justify-between items-center border  p-3 mb-4"
              >
                <div>
                  <p>
                    Amount to unstake: {Number(item.amount) / MICRO_CCD} CCD
                  </p>
                  <p>
                    Time to Unlock:{" "}
                    {`${formatDate(item.unlock_time)}, ${formatTime(
                      item.unlock_time
                    )}`}
                  </p>
                </div>

                <p
                  className={` ${
                    compareTimestamps(currentTime, item.unlock_time)
                      ? "text-green-300 "
                      : "text-gray-700"
                  } font-medium`}
                >
                  {compareTimestamps(currentTime, item.unlock_time)
                    ? "Completed"
                    : "Awaiting..."}
                </p>
              </div>
            );
          })}
        </div>
        <button
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
        </button>
      </div>
    </div>
  );
};

export default StakeForm;
