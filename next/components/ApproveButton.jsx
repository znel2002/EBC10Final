"use client";

import React from "react";
import { getGateawayClient, getRdtInstance } from "@/components/rdt";

const ApproveButton = () => {
  let xrdAddress =
    "resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc";
  let accountAddress;
  let componentAddress =
    "component_tdx_2_1cpmmj4w2ztd3alx9yd8azlw406g6s6st5nrtaah9fp33sszahxy5e2";
  let adminToken =
    "resource_tdx_2_1t45wxyksevg7mc3vq205fngl9jl3wx3m63dxsfylgc05jaa088tgp2";
  let isApproved = true; // some logic with API
  return (
    <button
      onClick={async () => {
        const gateApi = getGateawayClient();
        const ressourceAddressOfNFT =
          "resource_tdx_2_1ng305g4an42tgyux7zeuevxukzq7q0ec4zsa2cxq6tn20qe328j990";
        const rdt = getRdtInstance();
        rdt.walletApi.walletData$.subscribe((walletData) => {
          accountAddress = walletData.accounts[0].address;
          console.log("subscription wallet data: ", accountAddress);
        });
        console.log(gateApi);
        {
          /*            CALL_METHOD
                Address("${accountAddress}")
                "withdraw"
                Address("${xrdAddress}")
                Decimal("100"); */
        }
        let manifest = `




            CALL_METHOD Address("${accountAddress}")
            "create_proof_of_amount"
            Address("${adminToken}")
            Decimal("1");

            POP_FROM_AUTH_ZONE Proof("AdminToken");

            CALL_METHOD Address("${componentAddress}")
            "approve_payout"
            NonFungibleLocalId("#3#")
            Proof("AdminToken");

            CALL_METHOD Address("${accountAddress}")
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
      Approve
    </button>
  );
};

export default ApproveButton;
