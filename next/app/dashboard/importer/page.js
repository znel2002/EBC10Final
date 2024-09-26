import DashboardNavbar from "@/components/DashboardNavbar";
import LayoutWrapper from "@/components/DashboardWrapper";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { getGateawayClient, rdt } from "@/components/rdt";
import CreateEscrow from "@/components/CreateEscrow";
import ApproveButton from "@/components/ApproveButton";
import CashoutButton from "@/components/CashoutButton";
function isDocumentDefined() {
  return typeof document !== "undefined";
}
export default function Dashboard() {
  if (isDocumentDefined()) {
    rdt.walletApi.walletData$.subscribe((walletData) => {
      console.log("subscription wallet data: ", walletData);

      accountAddress = walletData.accounts[0].address;
    });
  }

  return (
    <LayoutWrapper>
      <div className="p-6 px-10 text-black w-full">
        <h1 className="text-3xl font-extrabold text-black">Importer</h1>
        <h2 className="text-2xl font-extrabold text-black">Orders</h2>
        <CreateEscrow />
        {/* <div className="border w-full p-3 hidden">
          <h2 className="text-xl font-medium">Order 3</h2>
        </div> */}
        {/* 
        <ApproveButton />
        <CashoutButton /> */}
      </div>
    </LayoutWrapper>
  );
}
