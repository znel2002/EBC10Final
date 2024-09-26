"use client";

import React from "react";
import { getGateawayClient, getRdtInstance } from "@/components/rdt";

const CashoutButton = () => {
  let xrdAddress =
    "resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc";
  let accountAddress;
  let componentAddress =
    "component_tdx_2_1cpmmj4w2ztd3alx9yd8azlw406g6s6st5nrtaah9fp33sszahxy5e2";
  let adminToken =
    "resource_tdx_2_1t45wxyksevg7mc3vq205fngl9jl3wx3m63dxsfylgc05jaa088tgp2";
  let isApproved = true; // some logic with API

  let claim_nft =
    "resource_tdx_2_1ng305g4an42tgyux7zeuevxukzq7q0ec4zsa2cxq6tn20qe328j990";
  return (
    <button
      onClick={async () => {
        const gateApi = getGateawayClient();

        const rdt = getRdtInstance();
        rdt.walletApi.walletData$.subscribe((walletData) => {
          accountAddress = walletData.accounts[0].address;
          console.log("subscription wallet data: ", accountAddress);
        });
        console.log(gateApi);
        let manifest = `
        CALL_METHOD
        Address("${accountAddress}")
        "withdraw_non_fungibles"
        Address("${claim_nft}")
        Array<NonFungibleLocalId>(NonFungibleLocalId("#3#"));

        TAKE_ALL_FROM_WORKTOP 
        Address("${claim_nft}")
        Bucket("claim_bucket");


        CALL_METHOD Address("${componentAddress}")
        "withdraw_money"
        Bucket("claim_bucket");

        CALL_METHOD Address("${accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP");
          `;

        console.log("withdraw manifest: ", manifest);
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
      Cashout
    </button>
  );
};

export default CashoutButton;
