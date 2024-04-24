"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaTable } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { GiPlayerPrevious } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaInfo } from "react-icons/fa";

const SideMenu = () => {
  const path = usePathname();

  // ------------ DATA ARABIC AND ENGLISH ---------
  const arList = [
    { label: "الصفحة الرئيسية", icon: <FaHome />, href: "/home" },
    { label: "جدول الأعمال", icon: <FaTable />, href: "/agenda" },
    {
      label: "إدارة الموقع",
      icon: <MdManageAccounts />,
      href: "/website",
    },
    { label: "أعمال اليوم", icon: <FaTasks />, href: "/daywork" },
    {
      label: "الحالات السابقة",
      icon: <GiPlayerPrevious />,
      href: "/previousCases",
    },
    { label: "تقارير", icon: <FaTasks />, href: "/reports" },
    { label: " معلومات", icon: <FaInfo />, href: "/" },
    { label: " الحسابات", icon: <FiLogIn />, href: "/logout" },
  ];

  const enList = [
    { label: "Home Page", icon: <FaHome />, href: "/home" },
    { label: "Agenda", icon: <FaTable />, href: "/agenda" },
    {
      label: "Website Management",
      icon: <MdManageAccounts />,
      href: "/website",
    },
    { label: "Daily Tasks", icon: <FaTasks />, href: "/daywork" },
    {
      label: "Previous Cases",
      icon: <GiPlayerPrevious />,
      href: "/previousCases",
    },
    { label: "Reports", icon: <FaTasks />, href: "/reports" },
    { label: "Info", icon: <FaInfo />, href: "/" },
    { label: "Accounts", icon: <FiLogIn />, href: "/logout" },
  ];

  const theme = useSelector((state: RootState) => state.theme).theme;
  const language = useSelector((state: RootState) => state.lang).language;
  const menu = useSelector((state: RootState) => state.menu).isOpen;
  return (
    <div
      className={`${
        language === "en"
          ? `${menu ? "max-sm:left-0" : " max-sm:left-[-50%]"}`
          : `max-sm:right-0 ${menu ? "max-sm:right-0" : "max-sm:right-[-50%]"}`
      } ${
        theme === "dark" ? "max-sm:bg-blck" : "max-sm:bg-white "
      }  when-mobile max-sm:fixed amin  rest-of-h side-shadow-md rounded-sm p-2 overflow-hidden overflow-y-auto `}
    >
      <div className="flex flex-col gap-6 mt-[20px] anim">
        {(language === "en" ? enList : arList).map((item) => (
          <Link
            className="flex items-center gap-2 anim hover:shadow-lg py-2 px-1 relative "
            href={item.href}
            key={item.href}
          >
            {path.includes(item.href) && (
              <motion.span
                layoutId="underline"
                className={`${
                  theme === "dark" ? "bg-light_blck" : "bg-light_white"
                } absolute left-0 top-0 rounded-sm  w-full block h-full`}
              />
            )}
            <span className="text-lg  relative z-10">{item.icon}</span>
            <span className=" relative z-10">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
