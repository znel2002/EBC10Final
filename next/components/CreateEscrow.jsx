"use client";

import React from "react";
import { getGateawayClient, getRdtInstance } from "@/components/rdt";

const CreateEscrow = () => {
  let xrdAddress =
    "resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc";
  let accountAddress;
  let componentAddress =
    "component_tdx_2_1cpmmj4w2ztd3alx9yd8azlw406g6s6st5nrtaah9fp33sszahxy5e2";
  let secondAccount =
    "account_tdx_2_12xsqdw684tcxhj7vxsn228zt9te895pu72rjt60vef3rr45dcnq6fx";
  return (
    <button
      onClick={async () => {
        const gateApi = getGateawayClient();
        const ressourceAddressOfNFT =
          "resource_tdx_2_1ng305g4an42tgyux7zeuevxukzq7q0ec4zsa2cxq6tn20qe328j990";
        const cancelNFT =
          "resource_tdx_2_1nfz8sz7sqkuhk2ycxmces3nxr250q6lvvjpez5nahqelx9dhg6saav";
        const rdt = getRdtInstance();
        rdt.walletApi.walletData$.subscribe((walletData) => {
          accountAddress = walletData.accounts[0].address;
          console.log("subscription wallet data: ", accountAddress);
        });
        console.log(gateApi);
        let manifest = `
        CALL_METHOD
          Address("${accountAddress}")
          "withdraw"    
          Address("${xrdAddress}")
          Decimal("100");
        TAKE_ALL_FROM_WORKTOP
          Address("${xrdAddress}")
          Bucket("xrd");
        CALL_METHOD
          Address("${componentAddress}")
          "new_escrow"
          Bucket("xrd");
        TAKE_ALL_FROM_WORKTOP 
          Address("${ressourceAddressOfNFT}")
          Bucket("cashout_nft");
        CALL_METHOD
          Address("${secondAccount}")
          "try_deposit_or_abort"
          Bucket("cashout_nft")
          Enum<0u8>( )
          ;
        CALL_METHOD
          Address("${accountAddress}")
          "deposit_batch"
          Expression("ENTIRE_WORKTOP");
          `;

        console.log("buy_gumball manifest: ", manifest);
        // const ids = await gateApi.state.getAllNonFungibleIds(
        //   ressourceAddressOfNFT
        // );

        const result = await getRdtInstance().walletApi.sendTransaction({
          transactionManifest: manifest,
          version: 1,
        });

        if (result.isErr()) throw result.error;
        console.log("Intantiate WalletSDK Result: ", result.value);
      }}
    >
      Create
    </button>
  );
};

export default CreateEscrow;
