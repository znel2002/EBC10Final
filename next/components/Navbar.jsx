"use client";

import React from "react";
import { getRdtInstance } from "./rdt";
const Navbar = () => {
  let accountAddress;
  const instance = getRdtInstance();
  instance.walletApi.walletData$.subscribe((walletData) => {
    console.log("subscription wallet data: ", walletData);

    accountAddress = walletData.accounts[0].address;
  });
  return (
    <nav className="h-20 w-full bg-green-400 shadow-2xl flex ">
      <div className="flex flex-1 justify-between items-center h-full px-4">
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="h-10" />
          <span className="ml-2 text-xl font-extrabold text-black tracking-widest">
            SBTT
          </span>
        </div>
        <div className="flex space-x-6 items-center">
          {/* <a href="/page1" className="text-gray-700 hover:text-gray-900">
            Page 1
          </a>
          <a href="/page2" className="text-gray-700 hover:text-gray-900">
            Page 2
          </a>
          <a href="/page3" className="text-gray-700 hover:text-gray-900">
            Page 3
          </a>
          <a href="/page4" className="text-gray-700 hover:text-gray-900">
            Page 4
          </a> */}
          <radix-connect-button />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
