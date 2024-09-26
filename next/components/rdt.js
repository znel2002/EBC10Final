// lib/rdtSingleton.js
import { GatewayApiClient } from "@radixdlt/babylon-gateway-api-sdk";
import {
  RadixNetwork,
  RadixDappToolkit,
  DataRequestBuilder,
} from "@radixdlt/radix-dapp-toolkit";

let rdtInstance;
let gateawayApi;
const isBrowser = typeof window !== "undefined";

const createRdtInstance = () => {
  if (!rdtInstance && isBrowser) {
    const appAddress =
      "account_tdx_2_12xkgqfv4d7kf7g3erlqtjuzktaev2qkqw7glx2gcpugjp5p54fytwf";
    rdtInstance = RadixDappToolkit({
      dAppDefinitionAddress: appAddress,
      networkId: RadixNetwork.Stokenet,
      applicationName: "Radix Web3 dApp",
      applicationVersion: "1.0.0",
      // logger: Logger,
    });
    rdtInstance.walletApi.setRequestData(
      DataRequestBuilder.accounts().atLeast(1)
    );
    console.log(rdtInstance.gatewayApi);
  }
  return rdtInstance;
};

const createGateApiClient = () => {
  if (!gateawayApi && rdtInstance && isBrowser) {
    gateawayApi = new GatewayApiClient(rdtInstance.gatewayApi);
  }
  return gateawayApi;
};

export const getRdtInstance = () => {
  return createRdtInstance();
};

export const getGateawayClient = () => {
  return createGateApiClient();
};
