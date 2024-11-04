import {
  BrowserWalletConnector,
  CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
  persistentConnectorType,
  WalletConnectConnector,
} from "@concordium/react-components";

// export const DEFAULT_CONTRACT_INDEX = BigInt(10303);
export const DEFAULT_CONTRACT_INDEX = BigInt(10306);
export const MAX_CONTRACT_EXECUTION_ENERGY = BigInt(30000);
// export const VERIFIER_URL = "http://localhost:8080/api";
// export const VERIFIER_URL =
//   "https://techfiesta-sbt-distributor.onrender.com/api";
// export const WEB_URL = "https://techfiesta-sbt-distributor.vercel.app";
export const CONTRACT_NAME = "staking";
export const CONTRACT_SUB_INDEX = BigInt(0);
export const MICRO_CCD = 1000000;

// export const REFRESH_INTERVAL = moment.duration(5, "seconds");

const WALLET_CONNECT_OPTS = {
  projectId: CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
  metadata: {
    name: "Staking Dapp",
    description: "Example dApp",
    url: "#",
    icons: ["https://walletconnect.com/walletconnect-logo.png"],
  },
};

export const BROWSER_WALLET = persistentConnectorType(
  BrowserWalletConnector.create
);
export const WALLET_CONNECT = persistentConnectorType(
  WalletConnectConnector.create.bind(this, WALLET_CONNECT_OPTS)
);
