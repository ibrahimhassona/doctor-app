"use client";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// ------------- DIRECTIAN & THEME CONTAINER --------------
const DireAndTheme = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.theme).theme;
  const language = useSelector((state: RootState) => state.lang).language;
  return (
    <div
      lang={language}
      dir={language === "en" ? "ltr" : "rtl"}
      className={` anim  
      ${theme} 
      ${language === "ar" ? "font-ar " : "font-en font-[400]"}  
      `}
    >
      {children}
    </div>
  );
};

export default DireAndTheme;
