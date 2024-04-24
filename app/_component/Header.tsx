"use client";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { languageToggle } from "../redux/slices/LanguagesSlice";
import { themeToggle } from "../redux/slices/ThemeSlice";
import En from "./smallcomponent/En";
import Ar from "./smallcomponent/Ar";
import { useEffect } from "react";
import { FaClinicMedical } from "react-icons/fa";
import { menuToggle } from "../redux/slices/MenuSlice";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme).theme;
  const language = useSelector((state: RootState) => state.lang).language;
  const menu = useSelector((state: RootState) => state.menu).isOpen;
  
  useEffect(() => {
    // Geting the theme & language from local storage and dispatch it to redux slice .
    const localStorageLang = localStorage.getItem("language");
    if (localStorageLang) {
      dispatch(languageToggle(localStorageLang));
    }
    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme) {
      dispatch(themeToggle(localStorageTheme));
    }
  }, [dispatch]);

  // Toggle the language & set the new value in local storage
  const handleLanguageToggle = () => {
    const newLang = language === "ar" ? "en" : "ar";
    dispatch(languageToggle(newLang));
    localStorage.setItem("language", newLang);
  };
  // Toggle the theme & set the new value in local storage
  const handleThemeToggle = () => {
    const newTheme: any = theme === "dark" ? "light" : "dark";
    dispatch(themeToggle(newTheme));
    localStorage.setItem("theme", newTheme);
  };
  // Toggle the menu case
  const handleMenuToggle = () => {
    dispatch(menuToggle(!menu));
  };
  return (
    <div className={` h-[43px] shadow-md rounded-sm mb-[2px]`}>
      <div className="container flex items-center justify-between h-full">
        {/* Menu */}
        <div
          className="sm:hidden text-2xl header-items"
          onClick={handleMenuToggle}
        >
          {menu ? <IoClose /> : <FiMenu />}
        </div>
        {/* Logo */}
        <div className=" header-items flex items-center gap-2  font-semibold">
          <FaClinicMedical className="text-2xl text-red" />
          <h1 className="">
            {language == "en" ? "Clinic Management" : "إدارة العيادة"}
          </h1>
        </div>
        {/* language */}
        <div onClick={handleLanguageToggle} className={`  header-items`}>
          {language === "en" ? <En /> : <Ar />}
        </div>
        {/* Change Theme */}
        <div
          onClick={handleThemeToggle}
          className={` text-xl cursor-pointer anim ${
            theme === "dark" ? "text-yellow" : "text-blck"
          }`}
        >
          {theme === "dark" ? <IoSunny /> : <FaMoon />}
        </div>
      </div>
    </div>
  );
};

export default Header;
