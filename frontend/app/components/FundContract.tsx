import { MAX_CONTRACT_EXECUTION_ENERGY } from "@/config";
import { useWallet } from "@/provider/WalletProvider";
import {
  AccountTransactionType,
  CcdAmount,
  ContractAddress,
  Energy,
  EntrypointName,
  ReceiveName,
} from "@concordium/web-sdk";

import React, { useState } from "react";
import toast from "react-hot-toast";

const FundContract = () => {
  const [stakeAmount, setStakeAmount] = useState("");

  const { contract, account, connection } = useWallet();

  const fundContract = async (amount: number) => {
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
            EntrypointName.fromString("transfer_to_contact")
          ),
          maxContractExecutionEnergy: Energy.create(
            MAX_CONTRACT_EXECUTION_ENERGY
          ),
        }
        // params
      );
      toast.success(`Successfully funded ${amount} CCD to the contract`);
      // transaction &&
      //   toast.success("Campaign successfully created", {
      //     id: loading,
      //   });
      // setTimeout(() => {
      //   // getProject();
      // }, 10000);
      return transaction;
    } catch (error) {
      toast.error("Error funding contract");
      console.error(error);
    }
  };
  return (
    <div className=" mb-10 bg-white shadow-md rounded-lg p-6 text-gray-700 ">
      <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
        Amount (CCD)
      </label>
      <div className="space-y-2 ">
        <input
          id="amount"
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
          placeholder="Enter amount"
          required
        />
      </div>
      <button
        type="button"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          if (!account) {
            toast.error(`Please connect a wallet to fund CCD`);
            return;
          }
          if (Number(stakeAmount) > 0) {
            fundContract(Number(stakeAmount));
          } else {
            toast.error("Amount must be greater than zero");
          }
        }}
      >
        Fund Contract
      </button>
    </div>
  );
};

export default FundContract;
