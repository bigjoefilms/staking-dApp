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
import { getCurrentDateTime } from "@/utils/utils";
import toast from "react-hot-toast";

const StakeForm = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [activeOption, setActiveOption] = useState("stake");

  const { connection, account, contract, rpc } = useWallet();

  const handleStakeOption = (option: string) => {
    setActiveOption(option);
    setStakeAmount("");
  };

  const currentTime = getCurrentDateTime();
  console.log(currentTime);

  const stake = async (amount: number) => {
    // const loading = toast.loading("Creating campaign...");
    try {
      const transaction = await connection?.signAndSendTransaction(
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
      toast.success(`Successfully Staked ${amount} CCD`);
      // transaction &&
      //   toast.success("Campaign successfully created", {
      //     id: loading,
      //   });
      // setTimeout(() => {
      //   // getProject();
      // }, 10000);
      return transaction;
    } catch (error) {
      toast.error("Error staking CCD");
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

      const transaction = await connection?.signAndSendTransaction(
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
      toast.success("Unstake successfully initiated");
      // transaction &&
      //   toast.success("Campaign successfully created", {
      //     id: loading,
      //   });
      // setTimeout(() => {
      //   // getProject();
      // }, 10000);
      return transaction;
    } catch (error) {
      toast.error("Error initiating unstake");
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-gray-700 ">
      <div className="flex items-center gap-5  w-full text-white mb-5">
        <button
          onClick={() => handleStakeOption("stake")}
          className={`${
            activeOption == "stake"
              ? "bg-blue-500"
              : "border border-gray-400 text-gray-700"
          } rounded-md w-[50%] p-2 `}
        >
          Stake
        </button>
        <button
          onClick={() => handleStakeOption("unstake")}
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

      <form className="space-y-4">
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

        <button
          type="button"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (!account) {
              toast.error(`Please connect a wallet to ${activeOption} CCD`);
              return;
            }
            if (Number(stakeAmount) > 0) {
              if (activeOption === "stake") {
                stake(Number(stakeAmount));
              } else {
                initiateUnstake(Number(stakeAmount));
              }
            } else {
              toast.error("Amount must be greater than zero");
            }
          }}
        >
          {activeOption === "stake" ? "Stake" : "Initiate Unstake"}
        </button>
      </form>
    </div>
  );
};

export default StakeForm;
