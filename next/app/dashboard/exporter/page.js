import DashboardNavbar from "@/components/DashboardNavbar";
import LayoutWrapper from "@/components/DashboardWrapper";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { rdt } from "@/components/rdt";
import ApproveButton from "@/components/ApproveButton";
import CashoutButton from "@/components/CashoutButton";
import CreateEscrow from "@/components/CreateEscrow";
function isDocumentDefined() {
  return typeof document !== "undefined";
}
export default function Dashboard() {
  return (
    <LayoutWrapper>
      {" "}
      <div className="p-6 px-10 ">
        <h1 className="text-3xl font-extrabold text-black">Exporter</h1>
        <CreateEscrow />
        <ApproveButton />
        <CashoutButton />
      </div>
    </LayoutWrapper>
  );
}
