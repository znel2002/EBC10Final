import DashboardNavbar from "@/components/DashboardNavbar";
import LayoutWrapper from "@/components/DashboardWrapper";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { gateawayApi, rdt } from "@/components/rdt";
import CreateEscrow from "@/components/CreateEscrow";
import ApproveButton from "@/components/ApproveButton";
import CashoutButton from "@/components/CashoutButton";
function isDocumentDefined() {
  return typeof document !== "undefined";
}

export default function Dashboard() {
  const gateApi = gateawayApi;
  const ressourceAddressOfNFT = "???";
  gateApi.state.getNonFungibleIds(ressourceAddressOfNFT).then((ids) => {
    console.log(ids);
  });
  return (
    <LayoutWrapper>
      {" "}
      <div className="p-6 px-10 ">
        <h1 className="text-3xl font-extrabold text-black">Admin</h1>
        <CreateEscrow />
        <ApproveButton />
        <CashoutButton />
      </div>
    </LayoutWrapper>
  );
}
