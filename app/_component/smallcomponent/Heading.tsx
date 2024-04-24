"use client"
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

interface HeadProp {
  en: string;
  ar: string;
  style?:string;
}
const Heading = ({ en,ar,style }: HeadProp) => {
    const language = useSelector((state:RootState)=>state.lang).language
  return <h1 className={`font-semibold text-xl m-5 ${style}`}>{language == 'en' ? en : ar}</h1>;
};

export default Heading;
