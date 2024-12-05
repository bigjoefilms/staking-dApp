/* eslint-disable no-case-declarations */
// @ts-nocheck
import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type =
  /*#__PURE__*/ SDK.ModuleReference.fromHexString(
    "8434a80c3225abad4738a15ae4f645f9840e54913e098922d6573893ba0c29b3"
  );
/** Name of the smart contract supported by this client. */
export const contractName: SDK.ContractName.Type =
  /*#__PURE__*/ SDK.ContractName.fromStringUnchecked("euroe_stablecoin_v3");

/** Smart contract client for a contract instance on chain. */
class EuroeStablecoinContract {
  /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
  private __nominal = true;
  /** The gRPC connection used by this client. */
  public readonly grpcClient: SDK.ConcordiumGRPCClient;
  /** The contract address used by this client. */
  public readonly contractAddress: SDK.ContractAddress.Type;
  /** Generic contract client used internally. */
  public readonly genericContract: SDK.Contract;

  constructor(
    grpcClient: SDK.ConcordiumGRPCClient,
    contractAddress: SDK.ContractAddress.Type,
    genericContract: SDK.Contract
  ) {
    this.grpcClient = grpcClient;
    this.contractAddress = contractAddress;
    this.genericContract = genericContract;
  }
}

/** Smart contract client for a contract instance on chain. */
export type Type = EuroeStablecoinContract;

/**
 * Construct an instance of `EuroeStablecoinContract` for interacting with a 'euroe_stablecoin' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {EuroeStablecoinContract}
 */
export async function create(
  grpcClient: SDK.ConcordiumGRPCClient,
  contractAddress: SDK.ContractAddress.Type,
  blockHash?: SDK.BlockHash.Type
): Promise<EuroeStablecoinContract> {
  const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
  await genericContract.checkOnChain({ moduleReference: moduleReference, blockHash: blockHash });
  return new EuroeStablecoinContract(grpcClient, contractAddress, genericContract);
}

/**
 * Construct the `EuroeStablecoinContract` for interacting with a 'euroe_stablecoin' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {EuroeStablecoinContract}
 */
export function createUnchecked(
  grpcClient: SDK.ConcordiumGRPCClient,
  contractAddress: SDK.ContractAddress.Type
): EuroeStablecoinContract {
  const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
  return new EuroeStablecoinContract(grpcClient, contractAddress, genericContract);
}

/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
export function checkOnChain(
  contractClient: EuroeStablecoinContract,
  blockHash?: SDK.BlockHash.Type
): Promise<void> {
  return contractClient.genericContract.checkOnChain({
    moduleReference: moduleReference,
    blockHash: blockHash,
  });
}
/** Parameter type  used in update transaction for 'view' entrypoint of the 'euroe_stablecoin' contract. */
export type ViewParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'view' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendView(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: ViewParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("view"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    parameter,
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'view' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunView(
  contractClient: EuroeStablecoinContract,
  parameter: ViewParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("view"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    parameter,
    blockHash
  );
}

/** Return value for dry-running update transaction for 'view' entrypoint of the 'euroe_stablecoin' contract. */
export type ReturnValueView = {
  state: Array<
    [
      (
        | { type: "Account"; content: SDK.AccountAddress.Type }
        | { type: "Contract"; content: SDK.ContractAddress.Type }
      ),
      {
        balances: Array<[SDK.HexString, number | bigint]>;
        operators: Array<
          | { type: "Account"; content: SDK.AccountAddress.Type }
          | { type: "Contract"; content: SDK.ContractAddress.Type }
        >;
      }
    ]
  >;
};

/**
 * Get and parse the return value from dry-running update transaction for 'view' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueView | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueView(
  invokeResult: SDK.InvokeContractResult
): ReturnValueView | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    {
      state: Array<
        [
          (
            | { Account: [SDK.AccountAddress.SchemaValue] }
            | { Contract: [SDK.ContractAddress.SchemaValue] }
          ),
          {
            balances: Array<[string, string]>;
            operators: Array<
              | { Account: [SDK.AccountAddress.SchemaValue] }
              | { Contract: [SDK.ContractAddress.SchemaValue] }
            >;
          }
        ]
      >;
    }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FAABAAAABQAAAHN0YXRlEAIPFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADBQAAgAAAAgAAABiYWxhbmNlcxACDx0AGyUAAAAJAAAAb3BlcmF0b3JzEAIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM");
  const field1 = schemaJson.state;
  const list2 = field1.map((item3) => {
    let match5:
      | { type: "Account"; content: SDK.AccountAddress.Type }
      | { type: "Contract"; content: SDK.ContractAddress.Type };
    if ("Account" in item3[0]) {
      const variant6 = item3[0].Account;
      const accountAddress7 = SDK.AccountAddress.fromSchemaValue(variant6[0]);
      match5 = {
        type: "Account",
        content: accountAddress7,
      };
    } else if ("Contract" in item3[0]) {
      const variant8 = item3[0].Contract;
      const contractAddress9 = SDK.ContractAddress.fromSchemaValue(variant8[0]);
      match5 = {
        type: "Contract",
        content: contractAddress9,
      };
    } else {
      throw new Error("Unexpected enum variant");
    }

    const field10 = item3[1].balances;
    const list11 = field10.map((item12) => {
      const leb0 = BigInt(item12[1]);
      const pair13: [SDK.HexString, number | bigint] = [item12[0], leb0];
      return pair13;
    });
    const field14 = item3[1].operators;
    const list15 = field14.map((item16) => {
      let match17:
        | { type: "Account"; content: SDK.AccountAddress.Type }
        | { type: "Contract"; content: SDK.ContractAddress.Type };
      if ("Account" in item16) {
        const variant18 = item16.Account;
        const accountAddress19 = SDK.AccountAddress.fromSchemaValue(variant18[0]);
        match17 = {
          type: "Account",
          content: accountAddress19,
        };
      } else if ("Contract" in item16) {
        const variant20 = item16.Contract;
        const contractAddress21 = SDK.ContractAddress.fromSchemaValue(variant20[0]);
        match17 = {
          type: "Contract",
          content: contractAddress21,
        };
      } else {
        throw new Error("Unexpected enum variant");
      }

      return match17;
    });
    const named22 = {
      balances: list11,
      operators: list15,
    };
    const pair4: [
      (
        | { type: "Account"; content: SDK.AccountAddress.Type }
        | { type: "Contract"; content: SDK.ContractAddress.Type }
      ),
      {
        balances: Array<[SDK.HexString, number | bigint]>;
        operators: Array<
          | { type: "Account"; content: SDK.AccountAddress.Type }
          | { type: "Contract"; content: SDK.ContractAddress.Type }
        >;
      }
    ] = [match5, named22];
    return pair4;
  });
  const named23 = {
    state: list2,
  };
  return named23;
}
/** Parameter type  used in update transaction for 'viewSupply' entrypoint of the 'euroe_stablecoin' contract. */
export type ViewSupplyParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'viewSupply' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewSupplyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendViewSupply(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: ViewSupplyParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("viewSupply"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    parameter,
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'viewSupply' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewSupplyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunViewSupply(
  contractClient: EuroeStablecoinContract,
  parameter: ViewSupplyParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("viewSupply"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    parameter,
    blockHash
  );
}

/** Return value for dry-running update transaction for 'viewSupply' entrypoint of the 'euroe_stablecoin' contract. */
export type ReturnValueViewSupply = {
  circulating_supply: number | bigint;
};

/**
 * Get and parse the return value from dry-running update transaction for 'viewSupply' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewSupply | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueViewSupply(
  invokeResult: SDK.InvokeContractResult
): ReturnValueViewSupply | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    {
      circulating_supply: string;
    }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FAABAAAAEgAAAGNpcmN1bGF0aW5nX3N1cHBseRslAAAA");
  const field25 = schemaJson.circulating_supply;
  const leb24 = BigInt(field25);
  const named26 = {
    circulating_supply: leb24,
  };
  return named26;
}
/** Base64 encoding of the parameter schema type for update transactions to 'mint' entrypoint of the 'euroe_stablecoin' contract. */
const base64MintParameterSchema =
  "FAACAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAABhbW91bnQbJQAAAA==";
/** Parameter JSON type needed by the schema for update transaction for 'mint' entrypoint of the 'euroe_stablecoin' contract. */
type MintParameterSchemaJson = {
  owner:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  amount: string;
};
/** Parameter type for update transaction for 'mint' entrypoint of the 'euroe_stablecoin' contract. */
export type MintParameter = {
  owner:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
  amount: number | bigint;
};

/**
 * Construct schema JSON representation used in update transaction for 'mint' entrypoint of the 'euroe_stablecoin' contract.
 * @param {MintParameter} parameter The structured parameter to construct from.
 * @returns {MintParameterSchemaJson} The smart contract parameter JSON.
 */
function createMintParameterSchemaJson(parameter: MintParameter): MintParameterSchemaJson {
  const field29 = parameter.owner;
  let match30:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field29.type) {
    case "Account":
      const accountAddress31 = SDK.AccountAddress.toSchemaValue(field29.content);
      match30 = { Account: [accountAddress31] };
      break;
    case "Contract":
      const contractAddress32 = SDK.ContractAddress.toSchemaValue(field29.content);
      match30 = { Contract: [contractAddress32] };
      break;
  }

  const field33 = parameter.amount;
  const leb27 = BigInt(field33).toString();
  const named28 = {
    owner: match30,
    amount: leb27,
  };
  return named28;
}

/**
 * Construct Parameter type used in update transaction for 'mint' entrypoint of the 'euroe_stablecoin' contract.
 * @param {MintParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createMintParameter(parameter: MintParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64MintParameterSchema,
    createMintParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'mint' entrypoint of the 'euroe_stablecoin' contract.
 * @param {MintParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createMintParameterWebWallet(parameter: MintParameter) {
  return {
    parameters: createMintParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64MintParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'mint' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {MintParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendMint(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: MintParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("mint"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createMintParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'mint' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {MintParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunMint(
  contractClient: EuroeStablecoinContract,
  parameter: MintParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("mint"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createMintParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'mint' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageMint =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'mint' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageMint | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageMint(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageMint | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match34:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match34 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match34 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match34 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant38 = schemaJson.Custom;
    let match39:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant38[0]) {
      match39 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant38[0]) {
      match39 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant38[0]) {
      match39 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant38[0]) {
      match39 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant38[0]) {
      match39 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant38[0]) {
      match39 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant38[0]) {
      match39 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant38[0]) {
      match39 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant38[0]) {
      match39 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant38[0]) {
      match39 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant38[0]) {
      match39 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant38[0]) {
      match39 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant38[0]) {
      match39 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant38[0]) {
      match39 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant38[0]) {
      match39 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant38[0]) {
      match39 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant38[0]) {
      match39 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant38[0]) {
      match39 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant38[0]) {
      match39 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant38[0]) {
      match39 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant38[0]) {
      match39 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match34 = {
      type: "Custom",
      content: match39,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match34;
}
/** Base64 encoding of the parameter schema type for update transactions to 'burn' entrypoint of the 'euroe_stablecoin' contract. */
const base64BurnParameterSchema =
  "FAACAAAABgAAAGFtb3VudBslAAAACwAAAGJ1cm5hZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
/** Parameter JSON type needed by the schema for update transaction for 'burn' entrypoint of the 'euroe_stablecoin' contract. */
type BurnParameterSchemaJson = {
  amount: string;
  burnaddress:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
};
/** Parameter type for update transaction for 'burn' entrypoint of the 'euroe_stablecoin' contract. */
export type BurnParameter = {
  amount: number | bigint;
  burnaddress:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
};

/**
 * Construct schema JSON representation used in update transaction for 'burn' entrypoint of the 'euroe_stablecoin' contract.
 * @param {BurnParameter} parameter The structured parameter to construct from.
 * @returns {BurnParameterSchemaJson} The smart contract parameter JSON.
 */
function createBurnParameterSchemaJson(parameter: BurnParameter): BurnParameterSchemaJson {
  const field63 = parameter.amount;
  const leb61 = BigInt(field63).toString();
  const field64 = parameter.burnaddress;
  let match65:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field64.type) {
    case "Account":
      const accountAddress66 = SDK.AccountAddress.toSchemaValue(field64.content);
      match65 = { Account: [accountAddress66] };
      break;
    case "Contract":
      const contractAddress67 = SDK.ContractAddress.toSchemaValue(field64.content);
      match65 = { Contract: [contractAddress67] };
      break;
  }

  const named62 = {
    amount: leb61,
    burnaddress: match65,
  };
  return named62;
}

/**
 * Construct Parameter type used in update transaction for 'burn' entrypoint of the 'euroe_stablecoin' contract.
 * @param {BurnParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createBurnParameter(parameter: BurnParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64BurnParameterSchema,
    createBurnParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'burn' entrypoint of the 'euroe_stablecoin' contract.
 * @param {BurnParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createBurnParameterWebWallet(parameter: BurnParameter) {
  return {
    parameters: createBurnParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64BurnParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'burn' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {BurnParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendBurn(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: BurnParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("burn"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createBurnParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'burn' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {BurnParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunBurn(
  contractClient: EuroeStablecoinContract,
  parameter: BurnParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("burn"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createBurnParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'burn' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageBurn =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'burn' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageBurn | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageBurn(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageBurn | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match68:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match68 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match68 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match68 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant72 = schemaJson.Custom;
    let match73:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant72[0]) {
      match73 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant72[0]) {
      match73 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant72[0]) {
      match73 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant72[0]) {
      match73 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant72[0]) {
      match73 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant72[0]) {
      match73 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant72[0]) {
      match73 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant72[0]) {
      match73 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant72[0]) {
      match73 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant72[0]) {
      match73 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant72[0]) {
      match73 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant72[0]) {
      match73 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant72[0]) {
      match73 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant72[0]) {
      match73 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant72[0]) {
      match73 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant72[0]) {
      match73 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant72[0]) {
      match73 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant72[0]) {
      match73 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant72[0]) {
      match73 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant72[0]) {
      match73 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant72[0]) {
      match73 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match68 = {
      type: "Custom",
      content: match73,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match68;
}
/** Base64 encoding of the parameter schema type for update transactions to 'transfer' entrypoint of the 'euroe_stablecoin' contract. */
const base64TransferParameterSchema =
  "EAEUAAUAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQQAAABkYXRhHQE=";
/** Parameter JSON type needed by the schema for update transaction for 'transfer' entrypoint of the 'euroe_stablecoin' contract. */
type TransferParameterSchemaJson = Array<{
  token_id: string;
  amount: string;
  from:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  to:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue, string] };
  data: string;
}>;
/** Parameter type for update transaction for 'transfer' entrypoint of the 'euroe_stablecoin' contract. */
export type TransferParameter = Array<{
  token_id: SDK.HexString;
  amount: number | bigint;
  from:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
  to:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: [SDK.ContractAddress.Type, string] };
  data: SDK.HexString;
}>;

/**
 * Construct schema JSON representation used in update transaction for 'transfer' entrypoint of the 'euroe_stablecoin' contract.
 * @param {TransferParameter} parameter The structured parameter to construct from.
 * @returns {TransferParameterSchemaJson} The smart contract parameter JSON.
 */
function createTransferParameterSchemaJson(
  parameter: TransferParameter
): TransferParameterSchemaJson {
  const list96 = parameter.map((item97) => {
    const field99 = item97.token_id;
    const field100 = item97.amount;
    const leb95 = BigInt(field100).toString();
    const field101 = item97.from;
    let match102:
      | { Account: [SDK.AccountAddress.SchemaValue] }
      | { Contract: [SDK.ContractAddress.SchemaValue] };
    switch (field101.type) {
      case "Account":
        const accountAddress103 = SDK.AccountAddress.toSchemaValue(field101.content);
        match102 = { Account: [accountAddress103] };
        break;
      case "Contract":
        const contractAddress104 = SDK.ContractAddress.toSchemaValue(field101.content);
        match102 = { Contract: [contractAddress104] };
        break;
    }

    const field105 = item97.to;
    let match106:
      | { Account: [SDK.AccountAddress.SchemaValue] }
      | { Contract: [SDK.ContractAddress.SchemaValue, string] };
    switch (field105.type) {
      case "Account":
        const accountAddress107 = SDK.AccountAddress.toSchemaValue(field105.content);
        match106 = { Account: [accountAddress107] };
        break;
      case "Contract":
        const contractAddress109 = SDK.ContractAddress.toSchemaValue(field105.content[0]);
        const unnamed108: [SDK.ContractAddress.SchemaValue, string] = [
          contractAddress109,
          field105.content[1],
        ];
        match106 = { Contract: unnamed108 };
        break;
    }

    const field110 = item97.data;
    const named98 = {
      token_id: field99,
      amount: leb95,
      from: match102,
      to: match106,
      data: field110,
    };
    return named98;
  });
  return list96;
}

/**
 * Construct Parameter type used in update transaction for 'transfer' entrypoint of the 'euroe_stablecoin' contract.
 * @param {TransferParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createTransferParameter(parameter: TransferParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64TransferParameterSchema,
    createTransferParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'transfer' entrypoint of the 'euroe_stablecoin' contract.
 * @param {TransferParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createTransferParameterWebWallet(parameter: TransferParameter) {
  return {
    parameters: createTransferParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64TransferParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'transfer' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {TransferParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendTransfer(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: TransferParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("transfer"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createTransferParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'transfer' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {TransferParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunTransfer(
  contractClient: EuroeStablecoinContract,
  parameter: TransferParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("transfer"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createTransferParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'transfer' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageTransfer =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'transfer' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageTransfer | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageTransfer(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageTransfer | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match111:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match111 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match111 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match111 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant115 = schemaJson.Custom;
    let match116:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant115[0]) {
      match116 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant115[0]) {
      match116 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant115[0]) {
      match116 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant115[0]) {
      match116 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant115[0]) {
      match116 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant115[0]) {
      match116 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant115[0]) {
      match116 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant115[0]) {
      match116 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant115[0]) {
      match116 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant115[0]) {
      match116 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant115[0]) {
      match116 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant115[0]) {
      match116 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant115[0]) {
      match116 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant115[0]) {
      match116 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant115[0]) {
      match116 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant115[0]) {
      match116 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant115[0]) {
      match116 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant115[0]) {
      match116 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant115[0]) {
      match116 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant115[0]) {
      match116 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant115[0]) {
      match116 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match111 = {
      type: "Custom",
      content: match116,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match111;
}
/** Base64 encoding of the parameter schema type for update transactions to 'updateOperator' entrypoint of the 'euroe_stablecoin' contract. */
const base64UpdateOperatorParameterSchema =
  "EAEUAAIAAAAGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQCCAAAAG9wZXJhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
/** Parameter JSON type needed by the schema for update transaction for 'updateOperator' entrypoint of the 'euroe_stablecoin' contract. */
type UpdateOperatorParameterSchemaJson = Array<{
  update: { Remove: [] } | { Add: [] };
  operator:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
}>;
/** Parameter type for update transaction for 'updateOperator' entrypoint of the 'euroe_stablecoin' contract. */
export type UpdateOperatorParameter = Array<{
  update: { type: "Remove" } | { type: "Add" };
  operator:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
}>;

/**
 * Construct schema JSON representation used in update transaction for 'updateOperator' entrypoint of the 'euroe_stablecoin' contract.
 * @param {UpdateOperatorParameter} parameter The structured parameter to construct from.
 * @returns {UpdateOperatorParameterSchemaJson} The smart contract parameter JSON.
 */
function createUpdateOperatorParameterSchemaJson(
  parameter: UpdateOperatorParameter
): UpdateOperatorParameterSchemaJson {
  const list138 = parameter.map((item139) => {
    const field141 = item139.update;
    let match142: { Remove: [] } | { Add: [] };
    switch (field141.type) {
      case "Remove":
        match142 = { Remove: [] };
        break;
      case "Add":
        match142 = { Add: [] };
        break;
    }

    const field143 = item139.operator;
    let match144:
      | { Account: [SDK.AccountAddress.SchemaValue] }
      | { Contract: [SDK.ContractAddress.SchemaValue] };
    switch (field143.type) {
      case "Account":
        const accountAddress145 = SDK.AccountAddress.toSchemaValue(field143.content);
        match144 = { Account: [accountAddress145] };
        break;
      case "Contract":
        const contractAddress146 = SDK.ContractAddress.toSchemaValue(field143.content);
        match144 = { Contract: [contractAddress146] };
        break;
    }

    const named140 = {
      update: match142,
      operator: match144,
    };
    return named140;
  });
  return list138;
}

/**
 * Construct Parameter type used in update transaction for 'updateOperator' entrypoint of the 'euroe_stablecoin' contract.
 * @param {UpdateOperatorParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createUpdateOperatorParameter(
  parameter: UpdateOperatorParameter
): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64UpdateOperatorParameterSchema,
    createUpdateOperatorParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'updateOperator' entrypoint of the 'euroe_stablecoin' contract.
 * @param {UpdateOperatorParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createUpdateOperatorParameterWebWallet(parameter: UpdateOperatorParameter) {
  return {
    parameters: createUpdateOperatorParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64UpdateOperatorParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'updateOperator' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {UpdateOperatorParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendUpdateOperator(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: UpdateOperatorParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("updateOperator"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createUpdateOperatorParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'updateOperator' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {UpdateOperatorParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunUpdateOperator(
  contractClient: EuroeStablecoinContract,
  parameter: UpdateOperatorParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("updateOperator"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createUpdateOperatorParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'updateOperator' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageUpdateOperator =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'updateOperator' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageUpdateOperator | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageUpdateOperator(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageUpdateOperator | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match147:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match147 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match147 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match147 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant151 = schemaJson.Custom;
    let match152:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant151[0]) {
      match152 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant151[0]) {
      match152 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant151[0]) {
      match152 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant151[0]) {
      match152 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant151[0]) {
      match152 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant151[0]) {
      match152 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant151[0]) {
      match152 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant151[0]) {
      match152 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant151[0]) {
      match152 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant151[0]) {
      match152 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant151[0]) {
      match152 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant151[0]) {
      match152 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant151[0]) {
      match152 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant151[0]) {
      match152 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant151[0]) {
      match152 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant151[0]) {
      match152 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant151[0]) {
      match152 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant151[0]) {
      match152 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant151[0]) {
      match152 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant151[0]) {
      match152 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant151[0]) {
      match152 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match147 = {
      type: "Custom",
      content: match152,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match147;
}
/** Base64 encoding of the parameter schema type for update transactions to 'balanceOf' entrypoint of the 'euroe_stablecoin' contract. */
const base64BalanceOfParameterSchema =
  "EAEUAAIAAAAIAAAAdG9rZW5faWQdAAcAAABhZGRyZXNzFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
/** Parameter JSON type needed by the schema for update transaction for 'balanceOf' entrypoint of the 'euroe_stablecoin' contract. */
type BalanceOfParameterSchemaJson = Array<{
  token_id: string;
  address:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
}>;
/** Parameter type for update transaction for 'balanceOf' entrypoint of the 'euroe_stablecoin' contract. */
export type BalanceOfParameter = Array<{
  token_id: SDK.HexString;
  address:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
}>;

/**
 * Construct schema JSON representation used in update transaction for 'balanceOf' entrypoint of the 'euroe_stablecoin' contract.
 * @param {BalanceOfParameter} parameter The structured parameter to construct from.
 * @returns {BalanceOfParameterSchemaJson} The smart contract parameter JSON.
 */
function createBalanceOfParameterSchemaJson(
  parameter: BalanceOfParameter
): BalanceOfParameterSchemaJson {
  const list174 = parameter.map((item175) => {
    const field177 = item175.token_id;
    const field178 = item175.address;
    let match179:
      | { Account: [SDK.AccountAddress.SchemaValue] }
      | { Contract: [SDK.ContractAddress.SchemaValue] };
    switch (field178.type) {
      case "Account":
        const accountAddress180 = SDK.AccountAddress.toSchemaValue(field178.content);
        match179 = { Account: [accountAddress180] };
        break;
      case "Contract":
        const contractAddress181 = SDK.ContractAddress.toSchemaValue(field178.content);
        match179 = { Contract: [contractAddress181] };
        break;
    }

    const named176 = {
      token_id: field177,
      address: match179,
    };
    return named176;
  });
  return list174;
}

/**
 * Construct Parameter type used in update transaction for 'balanceOf' entrypoint of the 'euroe_stablecoin' contract.
 * @param {BalanceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createBalanceOfParameter(parameter: BalanceOfParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64BalanceOfParameterSchema,
    createBalanceOfParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'balanceOf' entrypoint of the 'euroe_stablecoin' contract.
 * @param {BalanceOfParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createBalanceOfParameterWebWallet(parameter: BalanceOfParameter) {
  return {
    parameters: createBalanceOfParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64BalanceOfParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'balanceOf' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {BalanceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendBalanceOf(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: BalanceOfParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("balanceOf"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createBalanceOfParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'balanceOf' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {BalanceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunBalanceOf(
  contractClient: EuroeStablecoinContract,
  parameter: BalanceOfParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("balanceOf"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createBalanceOfParameter(parameter),
    blockHash
  );
}

/** Return value for dry-running update transaction for 'balanceOf' entrypoint of the 'euroe_stablecoin' contract. */
export type ReturnValueBalanceOf = Array<number | bigint>;

/**
 * Get and parse the return value from dry-running update transaction for 'balanceOf' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueBalanceOf | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueBalanceOf(
  invokeResult: SDK.InvokeContractResult
): ReturnValueBalanceOf | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <Array<string>>(
    SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "EAEbJQAAAA==")
  );
  const list183 = schemaJson.map((item184) => {
    const leb182 = BigInt(item184);
    return leb182;
  });
  return list183;
}

/** Error message for dry-running update transaction for 'balanceOf' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageBalanceOf =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'balanceOf' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageBalanceOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageBalanceOf(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageBalanceOf | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match185:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match185 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match185 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match185 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant189 = schemaJson.Custom;
    let match190:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant189[0]) {
      match190 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant189[0]) {
      match190 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant189[0]) {
      match190 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant189[0]) {
      match190 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant189[0]) {
      match190 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant189[0]) {
      match190 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant189[0]) {
      match190 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant189[0]) {
      match190 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant189[0]) {
      match190 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant189[0]) {
      match190 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant189[0]) {
      match190 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant189[0]) {
      match190 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant189[0]) {
      match190 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant189[0]) {
      match190 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant189[0]) {
      match190 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant189[0]) {
      match190 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant189[0]) {
      match190 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant189[0]) {
      match190 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant189[0]) {
      match190 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant189[0]) {
      match190 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant189[0]) {
      match190 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match185 = {
      type: "Custom",
      content: match190,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match185;
}
/** Base64 encoding of the parameter schema type for update transactions to 'operatorOf' entrypoint of the 'euroe_stablecoin' contract. */
const base64OperatorOfParameterSchema =
  "EAEUAAIAAAAFAAAAb3duZXIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBwAAAGFkZHJlc3MVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
/** Parameter JSON type needed by the schema for update transaction for 'operatorOf' entrypoint of the 'euroe_stablecoin' contract. */
type OperatorOfParameterSchemaJson = Array<{
  owner:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  address:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
}>;
/** Parameter type for update transaction for 'operatorOf' entrypoint of the 'euroe_stablecoin' contract. */
export type OperatorOfParameter = Array<{
  owner:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
  address:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
}>;

/**
 * Construct schema JSON representation used in update transaction for 'operatorOf' entrypoint of the 'euroe_stablecoin' contract.
 * @param {OperatorOfParameter} parameter The structured parameter to construct from.
 * @returns {OperatorOfParameterSchemaJson} The smart contract parameter JSON.
 */
function createOperatorOfParameterSchemaJson(
  parameter: OperatorOfParameter
): OperatorOfParameterSchemaJson {
  const list212 = parameter.map((item213) => {
    const field215 = item213.owner;
    let match216:
      | { Account: [SDK.AccountAddress.SchemaValue] }
      | { Contract: [SDK.ContractAddress.SchemaValue] };
    switch (field215.type) {
      case "Account":
        const accountAddress217 = SDK.AccountAddress.toSchemaValue(field215.content);
        match216 = { Account: [accountAddress217] };
        break;
      case "Contract":
        const contractAddress218 = SDK.ContractAddress.toSchemaValue(field215.content);
        match216 = { Contract: [contractAddress218] };
        break;
    }

    const field219 = item213.address;
    let match220:
      | { Account: [SDK.AccountAddress.SchemaValue] }
      | { Contract: [SDK.ContractAddress.SchemaValue] };
    switch (field219.type) {
      case "Account":
        const accountAddress221 = SDK.AccountAddress.toSchemaValue(field219.content);
        match220 = { Account: [accountAddress221] };
        break;
      case "Contract":
        const contractAddress222 = SDK.ContractAddress.toSchemaValue(field219.content);
        match220 = { Contract: [contractAddress222] };
        break;
    }

    const named214 = {
      owner: match216,
      address: match220,
    };
    return named214;
  });
  return list212;
}

/**
 * Construct Parameter type used in update transaction for 'operatorOf' entrypoint of the 'euroe_stablecoin' contract.
 * @param {OperatorOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createOperatorOfParameter(parameter: OperatorOfParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64OperatorOfParameterSchema,
    createOperatorOfParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'operatorOf' entrypoint of the 'euroe_stablecoin' contract.
 * @param {OperatorOfParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createOperatorOfParameterWebWallet(parameter: OperatorOfParameter) {
  return {
    parameters: createOperatorOfParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64OperatorOfParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'operatorOf' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {OperatorOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendOperatorOf(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: OperatorOfParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("operatorOf"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createOperatorOfParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'operatorOf' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {OperatorOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunOperatorOf(
  contractClient: EuroeStablecoinContract,
  parameter: OperatorOfParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("operatorOf"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createOperatorOfParameter(parameter),
    blockHash
  );
}

/** Return value for dry-running update transaction for 'operatorOf' entrypoint of the 'euroe_stablecoin' contract. */
export type ReturnValueOperatorOf = Array<boolean>;

/**
 * Get and parse the return value from dry-running update transaction for 'operatorOf' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueOperatorOf | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueOperatorOf(
  invokeResult: SDK.InvokeContractResult
): ReturnValueOperatorOf | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <Array<boolean>>(
    SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "EAEB")
  );
  return schemaJson;
}

/** Error message for dry-running update transaction for 'operatorOf' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageOperatorOf =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'operatorOf' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageOperatorOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageOperatorOf(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageOperatorOf | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match225:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match225 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match225 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match225 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant229 = schemaJson.Custom;
    let match230:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant229[0]) {
      match230 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant229[0]) {
      match230 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant229[0]) {
      match230 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant229[0]) {
      match230 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant229[0]) {
      match230 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant229[0]) {
      match230 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant229[0]) {
      match230 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant229[0]) {
      match230 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant229[0]) {
      match230 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant229[0]) {
      match230 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant229[0]) {
      match230 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant229[0]) {
      match230 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant229[0]) {
      match230 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant229[0]) {
      match230 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant229[0]) {
      match230 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant229[0]) {
      match230 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant229[0]) {
      match230 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant229[0]) {
      match230 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant229[0]) {
      match230 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant229[0]) {
      match230 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant229[0]) {
      match230 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match225 = {
      type: "Custom",
      content: match230,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match225;
}
/** Base64 encoding of the parameter schema type for update transactions to 'tokenMetadata' entrypoint of the 'euroe_stablecoin' contract. */
const base64TokenMetadataParameterSchema = "EAEdAA==";
/** Parameter JSON type needed by the schema for update transaction for 'tokenMetadata' entrypoint of the 'euroe_stablecoin' contract. */
type TokenMetadataParameterSchemaJson = Array<string>;
/** Parameter type for update transaction for 'tokenMetadata' entrypoint of the 'euroe_stablecoin' contract. */
export type TokenMetadataParameter = Array<SDK.HexString>;

/**
 * Construct schema JSON representation used in update transaction for 'tokenMetadata' entrypoint of the 'euroe_stablecoin' contract.
 * @param {TokenMetadataParameter} parameter The structured parameter to construct from.
 * @returns {TokenMetadataParameterSchemaJson} The smart contract parameter JSON.
 */
function createTokenMetadataParameterSchemaJson(
  parameter: TokenMetadataParameter
): TokenMetadataParameterSchemaJson {
  return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'tokenMetadata' entrypoint of the 'euroe_stablecoin' contract.
 * @param {TokenMetadataParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createTokenMetadataParameter(
  parameter: TokenMetadataParameter
): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64TokenMetadataParameterSchema,
    createTokenMetadataParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'tokenMetadata' entrypoint of the 'euroe_stablecoin' contract.
 * @param {TokenMetadataParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createTokenMetadataParameterWebWallet(parameter: TokenMetadataParameter) {
  return {
    parameters: createTokenMetadataParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64TokenMetadataParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'tokenMetadata' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {TokenMetadataParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendTokenMetadata(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: TokenMetadataParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("tokenMetadata"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createTokenMetadataParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'tokenMetadata' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {TokenMetadataParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunTokenMetadata(
  contractClient: EuroeStablecoinContract,
  parameter: TokenMetadataParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("tokenMetadata"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createTokenMetadataParameter(parameter),
    blockHash
  );
}

/** Return value for dry-running update transaction for 'tokenMetadata' entrypoint of the 'euroe_stablecoin' contract. */
export type ReturnValueTokenMetadata = Array<{
  url: string;
  hash: { type: "None" } | { type: "Some"; content: SDK.HexString };
}>;

/**
 * Get and parse the return value from dry-running update transaction for 'tokenMetadata' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueTokenMetadata | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueTokenMetadata(
  invokeResult: SDK.InvokeContractResult
): ReturnValueTokenMetadata | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    Array<{
      url: string;
      hash: { None: [] } | { Some: [string] };
    }>
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "EAEUAAIAAAADAAAAdXJsFgEEAAAAaGFzaBUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAAB4gAAAA");
  const list254 = schemaJson.map((item255) => {
    const field256 = item255.url;
    const field257 = item255.hash;
    let match258: { type: "None" } | { type: "Some"; content: SDK.HexString };
    if ("None" in field257) {
      match258 = {
        type: "None",
      };
    } else if ("Some" in field257) {
      const variant260 = field257.Some;
      match258 = {
        type: "Some",
        content: variant260[0],
      };
    } else {
      throw new Error("Unexpected enum variant");
    }

    const named261 = {
      url: field256,
      hash: match258,
    };
    return named261;
  });
  return list254;
}

/** Error message for dry-running update transaction for 'tokenMetadata' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageTokenMetadata =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'tokenMetadata' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageTokenMetadata | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageTokenMetadata(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageTokenMetadata | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match262:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match262 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match262 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match262 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant266 = schemaJson.Custom;
    let match267:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant266[0]) {
      match267 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant266[0]) {
      match267 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant266[0]) {
      match267 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant266[0]) {
      match267 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant266[0]) {
      match267 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant266[0]) {
      match267 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant266[0]) {
      match267 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant266[0]) {
      match267 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant266[0]) {
      match267 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant266[0]) {
      match267 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant266[0]) {
      match267 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant266[0]) {
      match267 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant266[0]) {
      match267 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant266[0]) {
      match267 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant266[0]) {
      match267 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant266[0]) {
      match267 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant266[0]) {
      match267 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant266[0]) {
      match267 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant266[0]) {
      match267 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant266[0]) {
      match267 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant266[0]) {
      match267 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match262 = {
      type: "Custom",
      content: match267,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match262;
}
/** Base64 encoding of the parameter schema type for update transactions to 'supports' entrypoint of the 'euroe_stablecoin' contract. */
const base64SupportsParameterSchema = "EAEWAA==";
/** Parameter JSON type needed by the schema for update transaction for 'supports' entrypoint of the 'euroe_stablecoin' contract. */
type SupportsParameterSchemaJson = Array<string>;
/** Parameter type for update transaction for 'supports' entrypoint of the 'euroe_stablecoin' contract. */
export type SupportsParameter = Array<string>;

/**
 * Construct schema JSON representation used in update transaction for 'supports' entrypoint of the 'euroe_stablecoin' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SupportsParameterSchemaJson} The smart contract parameter JSON.
 */
function createSupportsParameterSchemaJson(
  parameter: SupportsParameter
): SupportsParameterSchemaJson {
  return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'supports' entrypoint of the 'euroe_stablecoin' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSupportsParameter(parameter: SupportsParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64SupportsParameterSchema,
    createSupportsParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'supports' entrypoint of the 'euroe_stablecoin' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSupportsParameterWebWallet(parameter: SupportsParameter) {
  return {
    parameters: createSupportsParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64SupportsParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'supports' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSupports(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: SupportsParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("supports"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createSupportsParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'supports' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSupports(
  contractClient: EuroeStablecoinContract,
  parameter: SupportsParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("supports"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createSupportsParameter(parameter),
    blockHash
  );
}

/** Return value for dry-running update transaction for 'supports' entrypoint of the 'euroe_stablecoin' contract. */
export type ReturnValueSupports = Array<
  | { type: "NoSupport" }
  | { type: "Support" }
  | { type: "SupportBy"; content: Array<SDK.ContractAddress.Type> }
>;

/**
 * Get and parse the return value from dry-running update transaction for 'supports' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSupports | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueSupports(
  invokeResult: SDK.InvokeContractResult
): ReturnValueSupports | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    Array<
      { NoSupport: [] } | { Support: [] } | { SupportBy: [Array<SDK.ContractAddress.SchemaValue>] }
    >
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM"
  );
  const list291 = schemaJson.map((item292) => {
    let match293:
      | { type: "NoSupport" }
      | { type: "Support" }
      | { type: "SupportBy"; content: Array<SDK.ContractAddress.Type> };
    if ("NoSupport" in item292) {
      match293 = {
        type: "NoSupport",
      };
    } else if ("Support" in item292) {
      match293 = {
        type: "Support",
      };
    } else if ("SupportBy" in item292) {
      const variant296 = item292.SupportBy;
      const list297 = variant296[0].map((item298) => {
        const contractAddress299 = SDK.ContractAddress.fromSchemaValue(item298);
        return contractAddress299;
      });
      match293 = {
        type: "SupportBy",
        content: list297,
      };
    } else {
      throw new Error("Unexpected enum variant");
    }

    return match293;
  });
  return list291;
}

/** Error message for dry-running update transaction for 'supports' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageSupports =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'supports' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSupports | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSupports(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageSupports | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match300:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match300 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match300 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match300 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant304 = schemaJson.Custom;
    let match305:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant304[0]) {
      match305 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant304[0]) {
      match305 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant304[0]) {
      match305 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant304[0]) {
      match305 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant304[0]) {
      match305 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant304[0]) {
      match305 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant304[0]) {
      match305 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant304[0]) {
      match305 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant304[0]) {
      match305 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant304[0]) {
      match305 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant304[0]) {
      match305 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant304[0]) {
      match305 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant304[0]) {
      match305 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant304[0]) {
      match305 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant304[0]) {
      match305 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant304[0]) {
      match305 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant304[0]) {
      match305 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant304[0]) {
      match305 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant304[0]) {
      match305 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant304[0]) {
      match305 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant304[0]) {
      match305 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match300 = {
      type: "Custom",
      content: match305,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match300;
}
/** Base64 encoding of the parameter schema type for update transactions to 'setImplementors' entrypoint of the 'euroe_stablecoin' contract. */
const base64SetImplementorsParameterSchema = "FAACAAAAAgAAAGlkFgAMAAAAaW1wbGVtZW50b3JzEAIM";
/** Parameter JSON type needed by the schema for update transaction for 'setImplementors' entrypoint of the 'euroe_stablecoin' contract. */
type SetImplementorsParameterSchemaJson = {
  id: string;
  implementors: Array<SDK.ContractAddress.SchemaValue>;
};
/** Parameter type for update transaction for 'setImplementors' entrypoint of the 'euroe_stablecoin' contract. */
export type SetImplementorsParameter = {
  id: string;
  implementors: Array<SDK.ContractAddress.Type>;
};

/**
 * Construct schema JSON representation used in update transaction for 'setImplementors' entrypoint of the 'euroe_stablecoin' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns {SetImplementorsParameterSchemaJson} The smart contract parameter JSON.
 */
function createSetImplementorsParameterSchemaJson(
  parameter: SetImplementorsParameter
): SetImplementorsParameterSchemaJson {
  const field328 = parameter.id;
  const field329 = parameter.implementors;
  const list330 = field329.map((item331) => {
    const contractAddress332 = SDK.ContractAddress.toSchemaValue(item331);
    return contractAddress332;
  });
  const named327 = {
    id: field328,
    implementors: list330,
  };
  return named327;
}

/**
 * Construct Parameter type used in update transaction for 'setImplementors' entrypoint of the 'euroe_stablecoin' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSetImplementorsParameter(
  parameter: SetImplementorsParameter
): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64SetImplementorsParameterSchema,
    createSetImplementorsParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'setImplementors' entrypoint of the 'euroe_stablecoin' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSetImplementorsParameterWebWallet(parameter: SetImplementorsParameter) {
  return {
    parameters: createSetImplementorsParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64SetImplementorsParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'setImplementors' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SetImplementorsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSetImplementors(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: SetImplementorsParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("setImplementors"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createSetImplementorsParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'setImplementors' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SetImplementorsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSetImplementors(
  contractClient: EuroeStablecoinContract,
  parameter: SetImplementorsParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("setImplementors"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createSetImplementorsParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'setImplementors' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageSetImplementors =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'setImplementors' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSetImplementors | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSetImplementors(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageSetImplementors | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match333:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match333 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match333 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match333 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant337 = schemaJson.Custom;
    let match338:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant337[0]) {
      match338 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant337[0]) {
      match338 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant337[0]) {
      match338 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant337[0]) {
      match338 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant337[0]) {
      match338 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant337[0]) {
      match338 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant337[0]) {
      match338 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant337[0]) {
      match338 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant337[0]) {
      match338 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant337[0]) {
      match338 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant337[0]) {
      match338 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant337[0]) {
      match338 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant337[0]) {
      match338 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant337[0]) {
      match338 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant337[0]) {
      match338 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant337[0]) {
      match338 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant337[0]) {
      match338 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant337[0]) {
      match338 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant337[0]) {
      match338 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant337[0]) {
      match338 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant337[0]) {
      match338 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match333 = {
      type: "Custom",
      content: match338,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match333;
}
/** Base64 encoding of the parameter schema type for update transactions to 'setPaused' entrypoint of the 'euroe_stablecoin' contract. */
const base64SetPausedParameterSchema = "FAABAAAABgAAAHBhdXNlZAE=";
/** Parameter JSON type needed by the schema for update transaction for 'setPaused' entrypoint of the 'euroe_stablecoin' contract. */
type SetPausedParameterSchemaJson = {
  paused: boolean;
};
/** Parameter type for update transaction for 'setPaused' entrypoint of the 'euroe_stablecoin' contract. */
export type SetPausedParameter = {
  paused: boolean;
};

/**
 * Construct schema JSON representation used in update transaction for 'setPaused' entrypoint of the 'euroe_stablecoin' contract.
 * @param {SetPausedParameter} parameter The structured parameter to construct from.
 * @returns {SetPausedParameterSchemaJson} The smart contract parameter JSON.
 */
function createSetPausedParameterSchemaJson(
  parameter: SetPausedParameter
): SetPausedParameterSchemaJson {
  const field361 = parameter.paused;
  const named360 = {
    paused: field361,
  };
  return named360;
}

/**
 * Construct Parameter type used in update transaction for 'setPaused' entrypoint of the 'euroe_stablecoin' contract.
 * @param {SetPausedParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSetPausedParameter(parameter: SetPausedParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64SetPausedParameterSchema,
    createSetPausedParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'setPaused' entrypoint of the 'euroe_stablecoin' contract.
 * @param {SetPausedParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSetPausedParameterWebWallet(parameter: SetPausedParameter) {
  return {
    parameters: createSetPausedParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64SetPausedParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'setPaused' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SetPausedParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSetPaused(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: SetPausedParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("setPaused"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createSetPausedParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'setPaused' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SetPausedParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSetPaused(
  contractClient: EuroeStablecoinContract,
  parameter: SetPausedParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("setPaused"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createSetPausedParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'setPaused' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageSetPaused =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'setPaused' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSetPaused | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSetPaused(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageSetPaused | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match362:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match362 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match362 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match362 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant366 = schemaJson.Custom;
    let match367:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant366[0]) {
      match367 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant366[0]) {
      match367 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant366[0]) {
      match367 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant366[0]) {
      match367 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant366[0]) {
      match367 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant366[0]) {
      match367 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant366[0]) {
      match367 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant366[0]) {
      match367 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant366[0]) {
      match367 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant366[0]) {
      match367 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant366[0]) {
      match367 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant366[0]) {
      match367 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant366[0]) {
      match367 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant366[0]) {
      match367 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant366[0]) {
      match367 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant366[0]) {
      match367 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant366[0]) {
      match367 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant366[0]) {
      match367 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant366[0]) {
      match367 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant366[0]) {
      match367 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant366[0]) {
      match367 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match362 = {
      type: "Custom",
      content: match367,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match362;
}
/** Base64 encoding of the parameter schema type for update transactions to 'grantRole' entrypoint of the 'euroe_stablecoin' contract. */
const base64GrantRoleParameterSchema =
  "FAAFAAAACAAAAG1pbnRyb2xlFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAgAAABidXJucm9sZRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwJAAAAYmxvY2tyb2xlFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAkAAABwYXVzZXJvbGUVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMCQAAAGFkbWlucm9sZRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAw=";
/** Parameter JSON type needed by the schema for update transaction for 'grantRole' entrypoint of the 'euroe_stablecoin' contract. */
type GrantRoleParameterSchemaJson = {
  mintrole:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  burnrole:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  blockrole:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  pauserole:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  adminrole:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
};
/** Parameter type for update transaction for 'grantRole' entrypoint of the 'euroe_stablecoin' contract. */
export type GrantRoleParameter = {
  mintrole:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
  burnrole:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
  blockrole:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
  pauserole:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
  adminrole:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
};

/**
 * Construct schema JSON representation used in update transaction for 'grantRole' entrypoint of the 'euroe_stablecoin' contract.
 * @param {GrantRoleParameter} parameter The structured parameter to construct from.
 * @returns {GrantRoleParameterSchemaJson} The smart contract parameter JSON.
 */
function createGrantRoleParameterSchemaJson(
  parameter: GrantRoleParameter
): GrantRoleParameterSchemaJson {
  const field390 = parameter.mintrole;
  let match391:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field390.type) {
    case "Account":
      const accountAddress392 = SDK.AccountAddress.toSchemaValue(field390.content);
      match391 = { Account: [accountAddress392] };
      break;
    case "Contract":
      const contractAddress393 = SDK.ContractAddress.toSchemaValue(field390.content);
      match391 = { Contract: [contractAddress393] };
      break;
  }

  const field394 = parameter.burnrole;
  let match395:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field394.type) {
    case "Account":
      const accountAddress396 = SDK.AccountAddress.toSchemaValue(field394.content);
      match395 = { Account: [accountAddress396] };
      break;
    case "Contract":
      const contractAddress397 = SDK.ContractAddress.toSchemaValue(field394.content);
      match395 = { Contract: [contractAddress397] };
      break;
  }

  const field398 = parameter.blockrole;
  let match399:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field398.type) {
    case "Account":
      const accountAddress400 = SDK.AccountAddress.toSchemaValue(field398.content);
      match399 = { Account: [accountAddress400] };
      break;
    case "Contract":
      const contractAddress401 = SDK.ContractAddress.toSchemaValue(field398.content);
      match399 = { Contract: [contractAddress401] };
      break;
  }

  const field402 = parameter.pauserole;
  let match403:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field402.type) {
    case "Account":
      const accountAddress404 = SDK.AccountAddress.toSchemaValue(field402.content);
      match403 = { Account: [accountAddress404] };
      break;
    case "Contract":
      const contractAddress405 = SDK.ContractAddress.toSchemaValue(field402.content);
      match403 = { Contract: [contractAddress405] };
      break;
  }

  const field406 = parameter.adminrole;
  let match407:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field406.type) {
    case "Account":
      const accountAddress408 = SDK.AccountAddress.toSchemaValue(field406.content);
      match407 = { Account: [accountAddress408] };
      break;
    case "Contract":
      const contractAddress409 = SDK.ContractAddress.toSchemaValue(field406.content);
      match407 = { Contract: [contractAddress409] };
      break;
  }

  const named389 = {
    mintrole: match391,
    burnrole: match395,
    blockrole: match399,
    pauserole: match403,
    adminrole: match407,
  };
  return named389;
}

/**
 * Construct Parameter type used in update transaction for 'grantRole' entrypoint of the 'euroe_stablecoin' contract.
 * @param {GrantRoleParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGrantRoleParameter(parameter: GrantRoleParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64GrantRoleParameterSchema,
    createGrantRoleParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'grantRole' entrypoint of the 'euroe_stablecoin' contract.
 * @param {GrantRoleParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGrantRoleParameterWebWallet(parameter: GrantRoleParameter) {
  return {
    parameters: createGrantRoleParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64GrantRoleParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'grantRole' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GrantRoleParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGrantRole(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: GrantRoleParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("grantRole"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createGrantRoleParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'grantRole' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GrantRoleParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGrantRole(
  contractClient: EuroeStablecoinContract,
  parameter: GrantRoleParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("grantRole"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createGrantRoleParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'grantRole' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageGrantRole =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'grantRole' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGrantRole | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageGrantRole(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageGrantRole | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match410:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match410 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match410 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match410 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant414 = schemaJson.Custom;
    let match415:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant414[0]) {
      match415 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant414[0]) {
      match415 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant414[0]) {
      match415 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant414[0]) {
      match415 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant414[0]) {
      match415 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant414[0]) {
      match415 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant414[0]) {
      match415 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant414[0]) {
      match415 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant414[0]) {
      match415 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant414[0]) {
      match415 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant414[0]) {
      match415 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant414[0]) {
      match415 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant414[0]) {
      match415 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant414[0]) {
      match415 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant414[0]) {
      match415 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant414[0]) {
      match415 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant414[0]) {
      match415 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant414[0]) {
      match415 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant414[0]) {
      match415 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant414[0]) {
      match415 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant414[0]) {
      match415 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match410 = {
      type: "Custom",
      content: match415,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match410;
}
/** Base64 encoding of the parameter schema type for update transactions to 'removeRole' entrypoint of the 'euroe_stablecoin' contract. */
const base64RemoveRoleParameterSchema =
  "FAAFAAAACAAAAG1pbnRyb2xlFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAgAAABidXJucm9sZRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwJAAAAYmxvY2tyb2xlFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAkAAABwYXVzZXJvbGUVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMCQAAAGFkbWlucm9sZRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAw=";
/** Parameter JSON type needed by the schema for update transaction for 'removeRole' entrypoint of the 'euroe_stablecoin' contract. */
type RemoveRoleParameterSchemaJson = {
  mintrole:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  burnrole:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  blockrole:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  pauserole:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  adminrole:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
};
/** Parameter type for update transaction for 'removeRole' entrypoint of the 'euroe_stablecoin' contract. */
export type RemoveRoleParameter = {
  mintrole:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
  burnrole:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
  blockrole:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
  pauserole:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
  adminrole:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
};

/**
 * Construct schema JSON representation used in update transaction for 'removeRole' entrypoint of the 'euroe_stablecoin' contract.
 * @param {RemoveRoleParameter} parameter The structured parameter to construct from.
 * @returns {RemoveRoleParameterSchemaJson} The smart contract parameter JSON.
 */
function createRemoveRoleParameterSchemaJson(
  parameter: RemoveRoleParameter
): RemoveRoleParameterSchemaJson {
  const field438 = parameter.mintrole;
  let match439:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field438.type) {
    case "Account":
      const accountAddress440 = SDK.AccountAddress.toSchemaValue(field438.content);
      match439 = { Account: [accountAddress440] };
      break;
    case "Contract":
      const contractAddress441 = SDK.ContractAddress.toSchemaValue(field438.content);
      match439 = { Contract: [contractAddress441] };
      break;
  }

  const field442 = parameter.burnrole;
  let match443:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field442.type) {
    case "Account":
      const accountAddress444 = SDK.AccountAddress.toSchemaValue(field442.content);
      match443 = { Account: [accountAddress444] };
      break;
    case "Contract":
      const contractAddress445 = SDK.ContractAddress.toSchemaValue(field442.content);
      match443 = { Contract: [contractAddress445] };
      break;
  }

  const field446 = parameter.blockrole;
  let match447:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field446.type) {
    case "Account":
      const accountAddress448 = SDK.AccountAddress.toSchemaValue(field446.content);
      match447 = { Account: [accountAddress448] };
      break;
    case "Contract":
      const contractAddress449 = SDK.ContractAddress.toSchemaValue(field446.content);
      match447 = { Contract: [contractAddress449] };
      break;
  }

  const field450 = parameter.pauserole;
  let match451:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field450.type) {
    case "Account":
      const accountAddress452 = SDK.AccountAddress.toSchemaValue(field450.content);
      match451 = { Account: [accountAddress452] };
      break;
    case "Contract":
      const contractAddress453 = SDK.ContractAddress.toSchemaValue(field450.content);
      match451 = { Contract: [contractAddress453] };
      break;
  }

  const field454 = parameter.adminrole;
  let match455:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field454.type) {
    case "Account":
      const accountAddress456 = SDK.AccountAddress.toSchemaValue(field454.content);
      match455 = { Account: [accountAddress456] };
      break;
    case "Contract":
      const contractAddress457 = SDK.ContractAddress.toSchemaValue(field454.content);
      match455 = { Contract: [contractAddress457] };
      break;
  }

  const named437 = {
    mintrole: match439,
    burnrole: match443,
    blockrole: match447,
    pauserole: match451,
    adminrole: match455,
  };
  return named437;
}

/**
 * Construct Parameter type used in update transaction for 'removeRole' entrypoint of the 'euroe_stablecoin' contract.
 * @param {RemoveRoleParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createRemoveRoleParameter(parameter: RemoveRoleParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64RemoveRoleParameterSchema,
    createRemoveRoleParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'removeRole' entrypoint of the 'euroe_stablecoin' contract.
 * @param {RemoveRoleParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createRemoveRoleParameterWebWallet(parameter: RemoveRoleParameter) {
  return {
    parameters: createRemoveRoleParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64RemoveRoleParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'removeRole' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {RemoveRoleParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendRemoveRole(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: RemoveRoleParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("removeRole"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createRemoveRoleParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'removeRole' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {RemoveRoleParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunRemoveRole(
  contractClient: EuroeStablecoinContract,
  parameter: RemoveRoleParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("removeRole"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createRemoveRoleParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'removeRole' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageRemoveRole =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'removeRole' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageRemoveRole | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageRemoveRole(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageRemoveRole | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match458:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match458 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match458 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match458 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant462 = schemaJson.Custom;
    let match463:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant462[0]) {
      match463 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant462[0]) {
      match463 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant462[0]) {
      match463 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant462[0]) {
      match463 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant462[0]) {
      match463 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant462[0]) {
      match463 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant462[0]) {
      match463 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant462[0]) {
      match463 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant462[0]) {
      match463 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant462[0]) {
      match463 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant462[0]) {
      match463 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant462[0]) {
      match463 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant462[0]) {
      match463 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant462[0]) {
      match463 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant462[0]) {
      match463 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant462[0]) {
      match463 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant462[0]) {
      match463 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant462[0]) {
      match463 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant462[0]) {
      match463 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant462[0]) {
      match463 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant462[0]) {
      match463 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match458 = {
      type: "Custom",
      content: match463,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match458;
}
/** Base64 encoding of the parameter schema type for update transactions to 'block' entrypoint of the 'euroe_stablecoin' contract. */
const base64BlockParameterSchema =
  "FAABAAAAEAAAAGFkZHJlc3NfdG9fYmxvY2sVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
/** Parameter JSON type needed by the schema for update transaction for 'block' entrypoint of the 'euroe_stablecoin' contract. */
type BlockParameterSchemaJson = {
  address_to_block:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
};
/** Parameter type for update transaction for 'block' entrypoint of the 'euroe_stablecoin' contract. */
export type BlockParameter = {
  address_to_block:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
};

/**
 * Construct schema JSON representation used in update transaction for 'block' entrypoint of the 'euroe_stablecoin' contract.
 * @param {BlockParameter} parameter The structured parameter to construct from.
 * @returns {BlockParameterSchemaJson} The smart contract parameter JSON.
 */
function createBlockParameterSchemaJson(parameter: BlockParameter): BlockParameterSchemaJson {
  const field486 = parameter.address_to_block;
  let match487:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field486.type) {
    case "Account":
      const accountAddress488 = SDK.AccountAddress.toSchemaValue(field486.content);
      match487 = { Account: [accountAddress488] };
      break;
    case "Contract":
      const contractAddress489 = SDK.ContractAddress.toSchemaValue(field486.content);
      match487 = { Contract: [contractAddress489] };
      break;
  }

  const named485 = {
    address_to_block: match487,
  };
  return named485;
}

/**
 * Construct Parameter type used in update transaction for 'block' entrypoint of the 'euroe_stablecoin' contract.
 * @param {BlockParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createBlockParameter(parameter: BlockParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64BlockParameterSchema,
    createBlockParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'block' entrypoint of the 'euroe_stablecoin' contract.
 * @param {BlockParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createBlockParameterWebWallet(parameter: BlockParameter) {
  return {
    parameters: createBlockParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64BlockParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'block' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {BlockParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendBlock(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: BlockParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("block"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createBlockParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'block' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {BlockParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunBlock(
  contractClient: EuroeStablecoinContract,
  parameter: BlockParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("block"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createBlockParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'block' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageBlock =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'block' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageBlock | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageBlock(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageBlock | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match490:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match490 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match490 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match490 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant494 = schemaJson.Custom;
    let match495:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant494[0]) {
      match495 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant494[0]) {
      match495 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant494[0]) {
      match495 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant494[0]) {
      match495 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant494[0]) {
      match495 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant494[0]) {
      match495 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant494[0]) {
      match495 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant494[0]) {
      match495 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant494[0]) {
      match495 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant494[0]) {
      match495 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant494[0]) {
      match495 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant494[0]) {
      match495 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant494[0]) {
      match495 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant494[0]) {
      match495 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant494[0]) {
      match495 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant494[0]) {
      match495 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant494[0]) {
      match495 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant494[0]) {
      match495 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant494[0]) {
      match495 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant494[0]) {
      match495 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant494[0]) {
      match495 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match490 = {
      type: "Custom",
      content: match495,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match490;
}
/** Base64 encoding of the parameter schema type for update transactions to 'unblock' entrypoint of the 'euroe_stablecoin' contract. */
const base64UnblockParameterSchema =
  "FAABAAAAEgAAAGFkZHJlc3NfdG9fdW5ibG9jaxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAw=";
/** Parameter JSON type needed by the schema for update transaction for 'unblock' entrypoint of the 'euroe_stablecoin' contract. */
type UnblockParameterSchemaJson = {
  address_to_unblock:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
};
/** Parameter type for update transaction for 'unblock' entrypoint of the 'euroe_stablecoin' contract. */
export type UnblockParameter = {
  address_to_unblock:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
};

/**
 * Construct schema JSON representation used in update transaction for 'unblock' entrypoint of the 'euroe_stablecoin' contract.
 * @param {UnblockParameter} parameter The structured parameter to construct from.
 * @returns {UnblockParameterSchemaJson} The smart contract parameter JSON.
 */
function createUnblockParameterSchemaJson(parameter: UnblockParameter): UnblockParameterSchemaJson {
  const field518 = parameter.address_to_unblock;
  let match519:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field518.type) {
    case "Account":
      const accountAddress520 = SDK.AccountAddress.toSchemaValue(field518.content);
      match519 = { Account: [accountAddress520] };
      break;
    case "Contract":
      const contractAddress521 = SDK.ContractAddress.toSchemaValue(field518.content);
      match519 = { Contract: [contractAddress521] };
      break;
  }

  const named517 = {
    address_to_unblock: match519,
  };
  return named517;
}

/**
 * Construct Parameter type used in update transaction for 'unblock' entrypoint of the 'euroe_stablecoin' contract.
 * @param {UnblockParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createUnblockParameter(parameter: UnblockParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64UnblockParameterSchema,
    createUnblockParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'unblock' entrypoint of the 'euroe_stablecoin' contract.
 * @param {UnblockParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createUnblockParameterWebWallet(parameter: UnblockParameter) {
  return {
    parameters: createUnblockParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64UnblockParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'unblock' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {UnblockParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendUnblock(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: UnblockParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("unblock"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createUnblockParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'unblock' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {UnblockParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunUnblock(
  contractClient: EuroeStablecoinContract,
  parameter: UnblockParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("unblock"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createUnblockParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'unblock' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageUnblock =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'unblock' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageUnblock | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageUnblock(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageUnblock | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match522:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match522 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match522 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match522 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant526 = schemaJson.Custom;
    let match527:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant526[0]) {
      match527 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant526[0]) {
      match527 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant526[0]) {
      match527 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant526[0]) {
      match527 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant526[0]) {
      match527 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant526[0]) {
      match527 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant526[0]) {
      match527 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant526[0]) {
      match527 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant526[0]) {
      match527 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant526[0]) {
      match527 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant526[0]) {
      match527 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant526[0]) {
      match527 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant526[0]) {
      match527 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant526[0]) {
      match527 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant526[0]) {
      match527 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant526[0]) {
      match527 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant526[0]) {
      match527 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant526[0]) {
      match527 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant526[0]) {
      match527 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant526[0]) {
      match527 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant526[0]) {
      match527 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match522 = {
      type: "Custom",
      content: match527,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match522;
}
/** Base64 encoding of the parameter schema type for update transactions to 'upgrade' entrypoint of the 'euroe_stablecoin' contract. */
const base64UpgradeParameterSchema =
  "FAACAAAABgAAAG1vZHVsZR4gAAAABwAAAG1pZ3JhdGUVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAPFgEdAQ==";
/** Parameter JSON type needed by the schema for update transaction for 'upgrade' entrypoint of the 'euroe_stablecoin' contract. */
type UpgradeParameterSchemaJson = {
  module: string;
  migrate: { None: [] } | { Some: [[string, string]] };
};
/** Parameter type for update transaction for 'upgrade' entrypoint of the 'euroe_stablecoin' contract. */
export type UpgradeParameter = {
  module: SDK.HexString;
  migrate: { type: "None" } | { type: "Some"; content: [string, SDK.HexString] };
};

/**
 * Construct schema JSON representation used in update transaction for 'upgrade' entrypoint of the 'euroe_stablecoin' contract.
 * @param {UpgradeParameter} parameter The structured parameter to construct from.
 * @returns {UpgradeParameterSchemaJson} The smart contract parameter JSON.
 */
function createUpgradeParameterSchemaJson(parameter: UpgradeParameter): UpgradeParameterSchemaJson {
  const field550 = parameter.module;
  const field551 = parameter.migrate;
  let match552: { None: [] } | { Some: [[string, string]] };
  switch (field551.type) {
    case "None":
      match552 = { None: [] };
      break;
    case "Some":
      const pair553: [string, string] = [field551.content[0], field551.content[1]];
      match552 = { Some: [pair553] };
      break;
  }

  const named549 = {
    module: field550,
    migrate: match552,
  };
  return named549;
}

/**
 * Construct Parameter type used in update transaction for 'upgrade' entrypoint of the 'euroe_stablecoin' contract.
 * @param {UpgradeParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createUpgradeParameter(parameter: UpgradeParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64UpgradeParameterSchema,
    createUpgradeParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'upgrade' entrypoint of the 'euroe_stablecoin' contract.
 * @param {UpgradeParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createUpgradeParameterWebWallet(parameter: UpgradeParameter) {
  return {
    parameters: createUpgradeParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64UpgradeParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'upgrade' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {UpgradeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendUpgrade(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: UpgradeParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("upgrade"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createUpgradeParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'upgrade' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {UpgradeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunUpgrade(
  contractClient: EuroeStablecoinContract,
  parameter: UpgradeParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("upgrade"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createUpgradeParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'upgrade' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageUpgrade =
  | { type: "ParseParams" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "InvalidContractName" }
  | { type: "ContractOnly" }
  | { type: "InvokeContractError" }
  | { type: "TokenAlreadyMinted" }
  | { type: "MaxSupplyReached" }
  | { type: "NoBalanceToBurn" }
  | { type: "ContractPaused" }
  | { type: "AddressBlocklisted" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" };

/**
 * Get and parse the error message from dry-running update transaction for 'upgrade' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageUpgrade | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageUpgrade(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageUpgrade | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { InvalidContractName: [] }
    | { ContractOnly: [] }
    | { InvokeContractError: [] }
    | { TokenAlreadyMinted: [] }
    | { MaxSupplyReached: [] }
    | { NoBalanceToBurn: [] }
    | { ContractPaused: [] }
    | { AddressBlocklisted: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg=="
  );
  let match554:
    | { type: "ParseParams" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "InvalidContractName" }
    | { type: "ContractOnly" }
    | { type: "InvokeContractError" }
    | { type: "TokenAlreadyMinted" }
    | { type: "MaxSupplyReached" }
    | { type: "NoBalanceToBurn" }
    | { type: "ContractPaused" }
    | { type: "AddressBlocklisted" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" };
  if ("ParseParams" in schemaJson) {
    match554 = {
      type: "ParseParams",
    };
  } else if ("LogFull" in schemaJson) {
    match554 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match554 = {
      type: "LogMalformed",
    };
  } else if ("InvalidContractName" in schemaJson) {
    match554 = {
      type: "InvalidContractName",
    };
  } else if ("ContractOnly" in schemaJson) {
    match554 = {
      type: "ContractOnly",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match554 = {
      type: "InvokeContractError",
    };
  } else if ("TokenAlreadyMinted" in schemaJson) {
    match554 = {
      type: "TokenAlreadyMinted",
    };
  } else if ("MaxSupplyReached" in schemaJson) {
    match554 = {
      type: "MaxSupplyReached",
    };
  } else if ("NoBalanceToBurn" in schemaJson) {
    match554 = {
      type: "NoBalanceToBurn",
    };
  } else if ("ContractPaused" in schemaJson) {
    match554 = {
      type: "ContractPaused",
    };
  } else if ("AddressBlocklisted" in schemaJson) {
    match554 = {
      type: "AddressBlocklisted",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match554 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match554 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match554 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("MissingAccount" in schemaJson) {
    match554 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match554 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match554 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match554 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match554 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match554 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match554 = {
      type: "Expired",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match554;
}
/** Base64 encoding of the parameter schema type for update transactions to 'permit' entrypoint of the 'euroe_stablecoin' contract. */
const base64PermitParameterSchema =
  "FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=";
/** Parameter JSON type needed by the schema for update transaction for 'permit' entrypoint of the 'euroe_stablecoin' contract. */
type PermitParameterSchemaJson = {
  signature: [number, [number, { Ed25519: [string] }][]][];
  signer: SDK.AccountAddress.SchemaValue;
  message: {
    contract_address: SDK.ContractAddress.SchemaValue;
    nonce: bigint;
    timestamp: SDK.Timestamp.SchemaValue;
    entry_point: string;
    payload: Array<number>;
  };
};
/** Parameter type for update transaction for 'permit' entrypoint of the 'euroe_stablecoin' contract. */
export type PermitParameter = {
  signature: Map<number, Map<number, { type: "Ed25519"; content: SDK.HexString }>>;
  signer: SDK.AccountAddress.Type;
  message: {
    contract_address: SDK.ContractAddress.Type;
    nonce: number | bigint;
    timestamp: SDK.Timestamp.Type;
    entry_point: string;
    payload: Array<number>;
  };
};

/**
 * Construct schema JSON representation used in update transaction for 'permit' entrypoint of the 'euroe_stablecoin' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns {PermitParameterSchemaJson} The smart contract parameter JSON.
 */
function createPermitParameterSchemaJson(parameter: PermitParameter): PermitParameterSchemaJson {
  const field577 = parameter.signature;
  const map578: [number, [number, { Ed25519: [string] }][]][] = [...field577.entries()].map(
    ([key579, value580]) => {
      const map581: [number, { Ed25519: [string] }][] = [...value580.entries()].map(
        ([key582, value583]) => {
          let match584: { Ed25519: [string] };
          switch (value583.type) {
            case "Ed25519":
              match584 = { Ed25519: [value583.content] };
              break;
          }

          return [key582, match584];
        }
      );
      return [key579, map581];
    }
  );
  const field585 = parameter.signer;
  const accountAddress586 = SDK.AccountAddress.toSchemaValue(field585);
  const field587 = parameter.message;
  const field589 = field587.contract_address;
  const contractAddress590 = SDK.ContractAddress.toSchemaValue(field589);
  const field591 = field587.nonce;
  const number592 = BigInt(field591);
  const field593 = field587.timestamp;
  const timestamp594 = SDK.Timestamp.toSchemaValue(field593);
  const field595 = field587.entry_point;
  const field596 = field587.payload;
  const named588 = {
    contract_address: contractAddress590,
    nonce: number592,
    timestamp: timestamp594,
    entry_point: field595,
    payload: field596,
  };
  const named576 = {
    signature: map578,
    signer: accountAddress586,
    message: named588,
  };
  return named576;
}

/**
 * Construct Parameter type used in update transaction for 'permit' entrypoint of the 'euroe_stablecoin' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createPermitParameter(parameter: PermitParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64PermitParameterSchema,
    createPermitParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'permit' entrypoint of the 'euroe_stablecoin' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createPermitParameterWebWallet(parameter: PermitParameter) {
  return {
    parameters: createPermitParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64PermitParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'permit' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {PermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendPermit(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: PermitParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("permit"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createPermitParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'permit' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {PermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunPermit(
  contractClient: EuroeStablecoinContract,
  parameter: PermitParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("permit"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createPermitParameter(parameter),
    blockHash
  );
}
/** Base64 encoding of the parameter schema type for update transactions to 'viewMessageHash' entrypoint of the 'euroe_stablecoin' contract. */
const base64ViewMessageHashParameterSchema =
  "FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=";
/** Parameter JSON type needed by the schema for update transaction for 'viewMessageHash' entrypoint of the 'euroe_stablecoin' contract. */
type ViewMessageHashParameterSchemaJson = {
  signature: [number, [number, { Ed25519: [string] }][]][];
  signer: SDK.AccountAddress.SchemaValue;
  message: {
    contract_address: SDK.ContractAddress.SchemaValue;
    nonce: bigint;
    timestamp: SDK.Timestamp.SchemaValue;
    entry_point: string;
    payload: Array<number>;
  };
};
/** Parameter type for update transaction for 'viewMessageHash' entrypoint of the 'euroe_stablecoin' contract. */
export type ViewMessageHashParameter = {
  signature: Map<number, Map<number, { type: "Ed25519"; content: SDK.HexString }>>;
  signer: SDK.AccountAddress.Type;
  message: {
    contract_address: SDK.ContractAddress.Type;
    nonce: number | bigint;
    timestamp: SDK.Timestamp.Type;
    entry_point: string;
    payload: Array<number>;
  };
};

/**
 * Construct schema JSON representation used in update transaction for 'viewMessageHash' entrypoint of the 'euroe_stablecoin' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {ViewMessageHashParameterSchemaJson} The smart contract parameter JSON.
 */
function createViewMessageHashParameterSchemaJson(
  parameter: ViewMessageHashParameter
): ViewMessageHashParameterSchemaJson {
  const field600 = parameter.signature;
  const map601: [number, [number, { Ed25519: [string] }][]][] = [...field600.entries()].map(
    ([key602, value603]) => {
      const map604: [number, { Ed25519: [string] }][] = [...value603.entries()].map(
        ([key605, value606]) => {
          let match607: { Ed25519: [string] };
          switch (value606.type) {
            case "Ed25519":
              match607 = { Ed25519: [value606.content] };
              break;
          }

          return [key605, match607];
        }
      );
      return [key602, map604];
    }
  );
  const field608 = parameter.signer;
  const accountAddress609 = SDK.AccountAddress.toSchemaValue(field608);
  const field610 = parameter.message;
  const field612 = field610.contract_address;
  const contractAddress613 = SDK.ContractAddress.toSchemaValue(field612);
  const field614 = field610.nonce;
  const number615 = BigInt(field614);
  const field616 = field610.timestamp;
  const timestamp617 = SDK.Timestamp.toSchemaValue(field616);
  const field618 = field610.entry_point;
  const field619 = field610.payload;
  const named611 = {
    contract_address: contractAddress613,
    nonce: number615,
    timestamp: timestamp617,
    entry_point: field618,
    payload: field619,
  };
  const named599 = {
    signature: map601,
    signer: accountAddress609,
    message: named611,
  };
  return named599;
}

/**
 * Construct Parameter type used in update transaction for 'viewMessageHash' entrypoint of the 'euroe_stablecoin' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewMessageHashParameter(
  parameter: ViewMessageHashParameter
): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64ViewMessageHashParameterSchema,
    createViewMessageHashParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'viewMessageHash' entrypoint of the 'euroe_stablecoin' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createViewMessageHashParameterWebWallet(parameter: ViewMessageHashParameter) {
  return {
    parameters: createViewMessageHashParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64ViewMessageHashParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'viewMessageHash' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendViewMessageHash(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: ViewMessageHashParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("viewMessageHash"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createViewMessageHashParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'viewMessageHash' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunViewMessageHash(
  contractClient: EuroeStablecoinContract,
  parameter: ViewMessageHashParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("viewMessageHash"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createViewMessageHashParameter(parameter),
    blockHash
  );
}

/** Return value for dry-running update transaction for 'viewMessageHash' entrypoint of the 'euroe_stablecoin' contract. */
export type ReturnValueViewMessageHash = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

/**
 * Get and parse the return value from dry-running update transaction for 'viewMessageHash' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewMessageHash | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueViewMessageHash(
  invokeResult: SDK.InvokeContractResult
): ReturnValueViewMessageHash | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ]
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "EyAAAAAC");
  return schemaJson;
}
/** Base64 encoding of the parameter schema type for update transactions to 'supportsPermit' entrypoint of the 'euroe_stablecoin' contract. */
const base64SupportsPermitParameterSchema = "FAABAAAABwAAAHF1ZXJpZXMQARYB";
/** Parameter JSON type needed by the schema for update transaction for 'supportsPermit' entrypoint of the 'euroe_stablecoin' contract. */
type SupportsPermitParameterSchemaJson = {
  queries: Array<string>;
};
/** Parameter type for update transaction for 'supportsPermit' entrypoint of the 'euroe_stablecoin' contract. */
export type SupportsPermitParameter = {
  queries: Array<string>;
};

/**
 * Construct schema JSON representation used in update transaction for 'supportsPermit' entrypoint of the 'euroe_stablecoin' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns {SupportsPermitParameterSchemaJson} The smart contract parameter JSON.
 */
function createSupportsPermitParameterSchemaJson(
  parameter: SupportsPermitParameter
): SupportsPermitParameterSchemaJson {
  const field625 = parameter.queries;
  const named624 = {
    queries: field625,
  };
  return named624;
}

/**
 * Construct Parameter type used in update transaction for 'supportsPermit' entrypoint of the 'euroe_stablecoin' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSupportsPermitParameter(
  parameter: SupportsPermitParameter
): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64SupportsPermitParameterSchema,
    createSupportsPermitParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'supportsPermit' entrypoint of the 'euroe_stablecoin' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSupportsPermitParameterWebWallet(parameter: SupportsPermitParameter) {
  return {
    parameters: createSupportsPermitParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64SupportsPermitParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'supportsPermit' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsPermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSupportsPermit(
  contractClient: EuroeStablecoinContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: SupportsPermitParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("supportsPermit"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createSupportsPermitParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'supportsPermit' entrypoint of the 'euroe_stablecoin' contract.
 * @param {EuroeStablecoinContract} contractClient The client for a 'euroe_stablecoin' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsPermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSupportsPermit(
  contractClient: EuroeStablecoinContract,
  parameter: SupportsPermitParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("supportsPermit"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createSupportsPermitParameter(parameter),
    blockHash
  );
}

/** Return value for dry-running update transaction for 'supportsPermit' entrypoint of the 'euroe_stablecoin' contract. */
export type ReturnValueSupportsPermit = Array<
  | { type: "NoSupport" }
  | { type: "Support" }
  | { type: "SupportBy"; content: Array<SDK.ContractAddress.Type> }
>;

/**
 * Get and parse the return value from dry-running update transaction for 'supportsPermit' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSupportsPermit | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueSupportsPermit(
  invokeResult: SDK.InvokeContractResult
): ReturnValueSupportsPermit | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    Array<
      { NoSupport: [] } | { Support: [] } | { SupportBy: [Array<SDK.ContractAddress.SchemaValue>] }
    >
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM"
  );
  const list628 = schemaJson.map((item629) => {
    let match630:
      | { type: "NoSupport" }
      | { type: "Support" }
      | { type: "SupportBy"; content: Array<SDK.ContractAddress.Type> };
    if ("NoSupport" in item629) {
      match630 = {
        type: "NoSupport",
      };
    } else if ("Support" in item629) {
      match630 = {
        type: "Support",
      };
    } else if ("SupportBy" in item629) {
      const variant633 = item629.SupportBy;
      const list634 = variant633[0].map((item635) => {
        const contractAddress636 = SDK.ContractAddress.fromSchemaValue(item635);
        return contractAddress636;
      });
      match630 = {
        type: "SupportBy",
        content: list634,
      };
    } else {
      throw new Error("Unexpected enum variant");
    }

    return match630;
  });
  return list628;
}

/** Error message for dry-running update transaction for 'supportsPermit' entrypoint of the 'euroe_stablecoin' contract. */
export type ErrorMessageSupportsPermit =
  | { type: "InvalidTokenId" }
  | { type: "InsufficientFunds" }
  | { type: "Unauthorized" }
  | {
      type: "Custom";
      content:
        | { type: "ParseParams" }
        | { type: "LogFull" }
        | { type: "LogMalformed" }
        | { type: "InvalidContractName" }
        | { type: "ContractOnly" }
        | { type: "InvokeContractError" }
        | { type: "TokenAlreadyMinted" }
        | { type: "MaxSupplyReached" }
        | { type: "NoBalanceToBurn" }
        | { type: "ContractPaused" }
        | { type: "AddressBlocklisted" }
        | { type: "FailedUpgradeMissingModule" }
        | { type: "FailedUpgradeMissingContract" }
        | { type: "FailedUpgradeUnsupportedModuleVersion" }
        | { type: "MissingAccount" }
        | { type: "MalformedData" }
        | { type: "WrongSignature" }
        | { type: "NonceMismatch" }
        | { type: "WrongContract" }
        | { type: "WrongEntryPoint" }
        | { type: "Expired" };
    };

/**
 * Get and parse the error message from dry-running update transaction for 'supportsPermit' entrypoint of the 'euroe_stablecoin' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSupportsPermit | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSupportsPermit(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageSupportsPermit | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { InvalidTokenId: [] }
    | { InsufficientFunds: [] }
    | { Unauthorized: [] }
    | {
        Custom: [
          | { ParseParams: [] }
          | { LogFull: [] }
          | { LogMalformed: [] }
          | { InvalidContractName: [] }
          | { ContractOnly: [] }
          | { InvokeContractError: [] }
          | { TokenAlreadyMinted: [] }
          | { MaxSupplyReached: [] }
          | { NoBalanceToBurn: [] }
          | { ContractPaused: [] }
          | { AddressBlocklisted: [] }
          | { FailedUpgradeMissingModule: [] }
          | { FailedUpgradeMissingContract: [] }
          | { FailedUpgradeUnsupportedModuleVersion: [] }
          | { MissingAccount: [] }
          | { MalformedData: [] }
          | { WrongSignature: [] }
          | { NonceMismatch: [] }
          | { WrongContract: [] }
          | { WrongEntryPoint: [] }
          | { Expired: [] }
        ];
      }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FQQAAAAOAAAASW52YWxpZFRva2VuSWQCEQAAAEluc3VmZmljaWVudEZ1bmRzAgwAAABVbmF1dGhvcml6ZWQCBgAAAEN1c3RvbQEBAAAAFRUAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAITAAAASW52YWxpZENvbnRyYWN0TmFtZQIMAAAAQ29udHJhY3RPbmx5AhMAAABJbnZva2VDb250cmFjdEVycm9yAhIAAABUb2tlbkFscmVhZHlNaW50ZWQCEAAAAE1heFN1cHBseVJlYWNoZWQCDwAAAE5vQmFsYW5jZVRvQnVybgIOAAAAQ29udHJhY3RQYXVzZWQCEgAAAEFkZHJlc3NCbG9ja2xpc3RlZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAE1pc3NpbmdBY2NvdW50Ag0AAABNYWxmb3JtZWREYXRhAg4AAABXcm9uZ1NpZ25hdHVyZQINAAAATm9uY2VNaXNtYXRjaAINAAAAV3JvbmdDb250cmFjdAIPAAAAV3JvbmdFbnRyeVBvaW50AgcAAABFeHBpcmVkAg==");
  let match637:
    | { type: "InvalidTokenId" }
    | { type: "InsufficientFunds" }
    | { type: "Unauthorized" }
    | {
        type: "Custom";
        content:
          | { type: "ParseParams" }
          | { type: "LogFull" }
          | { type: "LogMalformed" }
          | { type: "InvalidContractName" }
          | { type: "ContractOnly" }
          | { type: "InvokeContractError" }
          | { type: "TokenAlreadyMinted" }
          | { type: "MaxSupplyReached" }
          | { type: "NoBalanceToBurn" }
          | { type: "ContractPaused" }
          | { type: "AddressBlocklisted" }
          | { type: "FailedUpgradeMissingModule" }
          | { type: "FailedUpgradeMissingContract" }
          | { type: "FailedUpgradeUnsupportedModuleVersion" }
          | { type: "MissingAccount" }
          | { type: "MalformedData" }
          | { type: "WrongSignature" }
          | { type: "NonceMismatch" }
          | { type: "WrongContract" }
          | { type: "WrongEntryPoint" }
          | { type: "Expired" };
      };
  if ("InvalidTokenId" in schemaJson) {
    match637 = {
      type: "InvalidTokenId",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match637 = {
      type: "InsufficientFunds",
    };
  } else if ("Unauthorized" in schemaJson) {
    match637 = {
      type: "Unauthorized",
    };
  } else if ("Custom" in schemaJson) {
    const variant641 = schemaJson.Custom;
    let match642:
      | { type: "ParseParams" }
      | { type: "LogFull" }
      | { type: "LogMalformed" }
      | { type: "InvalidContractName" }
      | { type: "ContractOnly" }
      | { type: "InvokeContractError" }
      | { type: "TokenAlreadyMinted" }
      | { type: "MaxSupplyReached" }
      | { type: "NoBalanceToBurn" }
      | { type: "ContractPaused" }
      | { type: "AddressBlocklisted" }
      | { type: "FailedUpgradeMissingModule" }
      | { type: "FailedUpgradeMissingContract" }
      | { type: "FailedUpgradeUnsupportedModuleVersion" }
      | { type: "MissingAccount" }
      | { type: "MalformedData" }
      | { type: "WrongSignature" }
      | { type: "NonceMismatch" }
      | { type: "WrongContract" }
      | { type: "WrongEntryPoint" }
      | { type: "Expired" };
    if ("ParseParams" in variant641[0]) {
      match642 = {
        type: "ParseParams",
      };
    } else if ("LogFull" in variant641[0]) {
      match642 = {
        type: "LogFull",
      };
    } else if ("LogMalformed" in variant641[0]) {
      match642 = {
        type: "LogMalformed",
      };
    } else if ("InvalidContractName" in variant641[0]) {
      match642 = {
        type: "InvalidContractName",
      };
    } else if ("ContractOnly" in variant641[0]) {
      match642 = {
        type: "ContractOnly",
      };
    } else if ("InvokeContractError" in variant641[0]) {
      match642 = {
        type: "InvokeContractError",
      };
    } else if ("TokenAlreadyMinted" in variant641[0]) {
      match642 = {
        type: "TokenAlreadyMinted",
      };
    } else if ("MaxSupplyReached" in variant641[0]) {
      match642 = {
        type: "MaxSupplyReached",
      };
    } else if ("NoBalanceToBurn" in variant641[0]) {
      match642 = {
        type: "NoBalanceToBurn",
      };
    } else if ("ContractPaused" in variant641[0]) {
      match642 = {
        type: "ContractPaused",
      };
    } else if ("AddressBlocklisted" in variant641[0]) {
      match642 = {
        type: "AddressBlocklisted",
      };
    } else if ("FailedUpgradeMissingModule" in variant641[0]) {
      match642 = {
        type: "FailedUpgradeMissingModule",
      };
    } else if ("FailedUpgradeMissingContract" in variant641[0]) {
      match642 = {
        type: "FailedUpgradeMissingContract",
      };
    } else if ("FailedUpgradeUnsupportedModuleVersion" in variant641[0]) {
      match642 = {
        type: "FailedUpgradeUnsupportedModuleVersion",
      };
    } else if ("MissingAccount" in variant641[0]) {
      match642 = {
        type: "MissingAccount",
      };
    } else if ("MalformedData" in variant641[0]) {
      match642 = {
        type: "MalformedData",
      };
    } else if ("WrongSignature" in variant641[0]) {
      match642 = {
        type: "WrongSignature",
      };
    } else if ("NonceMismatch" in variant641[0]) {
      match642 = {
        type: "NonceMismatch",
      };
    } else if ("WrongContract" in variant641[0]) {
      match642 = {
        type: "WrongContract",
      };
    } else if ("WrongEntryPoint" in variant641[0]) {
      match642 = {
        type: "WrongEntryPoint",
      };
    } else if ("Expired" in variant641[0]) {
      match642 = {
        type: "Expired",
      };
    } else {
      throw new Error("Unexpected enum variant");
    }
    match637 = {
      type: "Custom",
      content: match642,
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match637;
}
