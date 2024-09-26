import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
const pages = [
  {
    name: "Importer",
    icon: faArrowAltCircleUp,
    link: "/dashboard/importer",
  },
  {
    name: "Exporter",
    icon: faArrowAltCircleDown,
    link: "/dashboard/exporter",
  },
];

const DashboardNavbar = () => {
  return (
    <div className="w-48 h-full p-2 py-4 bg-white shadow-xl">
      <ul className="flex flex-col space-y-3">
        {pages.map((page, index) => (
          <Link
            key={index}
            href={page.link}
            className="w-full text-black font-bold bg-white rounded-sm hover:bg-slate-100 h-12 flex items-center p-2 px-6"
          >
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={page.icon}
                className="text-black w-4 h-4"
                size="1x"
              />
              <p>{page.name}</p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DashboardNavbar;
