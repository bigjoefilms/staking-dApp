"use client";
import React from "react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UnbondingInfo {
  amount: string;
  unlock_time: string;
}

interface StakerInfo {
  last_reward_timestamp: string;
  pending_rewards: string;
  slashed: boolean;
  staked_amount: string;
  unbonding: UnbondingInfo[];
}

interface Context {
  stakerInfo: StakerInfo | null;
  setStakerInfo: React.Dispatch<React.SetStateAction<StakerInfo | null>>;
}
const StateContext = createContext<Context>({
  stakerInfo: {
    last_reward_timestamp: "",
    pending_rewards: "",
    slashed: false,
    staked_amount: "",
    unbonding: [
      {
        amount: "",
        unlock_time: "",
      },
    ],
  },
  setStakerInfo: () => {},
});

interface State {
  children: React.ReactNode;
}
const StateProvider = ({ children }: State) => {
  const [stakerInfo, setStakerInfo] = useState<StakerInfo | null>(null);
  return (
    <StateContext.Provider value={{ stakerInfo, setStakerInfo }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;

export const useStateProvider = () => {
  return useContext(StateContext);
};
