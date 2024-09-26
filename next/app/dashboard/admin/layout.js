import localFont from "next/font/local";
import "../../globals.css";
import { RadixDappToolkit } from "@radixdlt/radix-dapp-toolkit";
import Navbar from "@/components/Navbar";
import { getRdtInstance } from "@/components/rdt";
import { GatewayApiClient } from "@radixdlt/babylon-gateway-api-sdk";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  if (rdt)
    return (
      <html lang="en">
        <body className={` antialiased`}></body>
      </html>
    );
}
