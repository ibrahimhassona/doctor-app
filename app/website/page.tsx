"use client";

import { useEffect, useState } from "react";
import MotionWraping from "../_component/MotionWraping";
import Heading from "../_component/smallcomponent/Heading";
import { getAboutUsData } from "../lib/analized-data";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IoClose } from "react-icons/io5";
import { supabaseClient } from "../lib/supabaseClient";
import { toast } from "react-toastify";
import Services from "../_component/Services";
import accessability from "../lib/accessability";

const Page = () => {
  const supabase = supabaseClient;
  const language = useSelector((state: RootState) => state.lang).language;
  const theme = useSelector((state: RootState) => state.theme).theme;
  const [openModule, setOpenModule] = useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [dataItem, setDataItem] = useState<any>();
  const [descText, setDescText] = useState<string>();
  const [headText, setHeadText] = useState<string>();
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [userRole, setUserRole] = useState<boolean>();

  // Accessability
  useEffect(() => {
    const isAdmin = async () => {
      const access: boolean = await accessability();
      setUserRole(access);
    };
    isAdmin();
  }, [userRole]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAboutUsData();
        setData(result);
      } catch (error) {
        console.error("Error fetching about us data:", error);
      }
    };
    fetchData();
  }, []);

  const updateAboutUs = async () => {
    try {
      const { data, error } = await supabase
        .from("about_us")
        .update({ desc: descText, head: headText })
        .eq("id", dataItem.id)
        .select();

      if (error) {
        throw new Error(error.message);
      } else {
        toast(
          `${language == "en" ? "Update successful" : "تم التحديث بنجاح"}`,
          {
            hideProgressBar: true,
            autoClose: 3000,
            type: "success",
          }
        );
      }

      console.log("Update successful:", data);
    } catch (error: any) {
      console.error("Error updating about us:", error.message);
    }
  };

  const insertAboutUs = async () => {
    try {
      const { data, error } = await supabase
        .from("about_us")
        .insert({ desc: descText, head: headText })
        .select();

      if (error) {
        throw new Error(error.message);
      } else {
        toast(
          `${language == "en" ? "Adding successful" : "تمت الاضافه بنجاح"}`,
          {
            hideProgressBar: true,
            autoClose: 3000,
            type: "success",
          }
        );
      }

      console.log("Insert successful:", data);
    } catch (error: any) {
      console.error("Error Inserting about us:", error.message);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  return (
    <MotionWraping>
      <Heading ar="إعدادات الموقع" en="Website Settings" />
      {userRole && (
        <div className="flex  flex-col gap-5 relative">
          <h1 className="text-light_green font-semibold mx-6 text-xl">
            {language == "en" ? "About Us" : "نبذة عنا"}
          </h1>
          <button
            onClick={() => {
              setOpenModule(true);
              setAdding(true);
            }}
            className="bg-green px-3 py-1 rounded-sm hover:bg-light_green anim w-[100px] mx-auto"
          >
            {language == "en" ? "Add One" : "إضافة نبذه"}
          </button>
          {data?.map((item: any, index: number) => (
            <div
              key={index}
              className="p-2 rounded-sm shadow-sm mx-auto cursor-pointer border w-[80%]"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex justify-between">
                <h2 className="font-semibold cursor-pointer ">{item.head}</h2>
                <button
                  className="bg-green px-3 py-1 rounded-sm hover:bg-light_green anim"
                  onClick={() => {
                    setDataItem(item);
                    setOpenModule(true);
                  }}
                >
                  {language == "en" ? "Editing" : "تعديل"}
                </button>
              </div>
              <p
                className={`mt-2 anim px-4 ${
                  expandedIndex === index ? "block " : "hidden "
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}

          <div
            className={` ${
              openModule ? "block" : "hidden"
            } absolute top-0 left-0 h-[600px] w-full bg-transparent anim flex items-center justify-center  z-30`}
          >
            <div
              className={`flex flex-col gap-3 mt-6 p-4 items-center w-[80%] h-[400px]  rounded-sm relative ${
                theme == "dark" ? "bg-light_blck" : "bg-light_white"
              }`}
            >
              {adding !== true && (
                <>
                  <h1 className="font-semibold">{dataItem?.head}</h1>
                  <p className="">{dataItem?.desc}</p>
                </>
              )}
              <div
                className=" close-module"
                onClick={() => setOpenModule(false)}
              >
                <IoClose />
              </div>
              <textarea
                name="desc"
                className="h-[50px] w-[90%] bg-transparent rounded-sm outline-none border p-2"
                placeholder={
                  language == "en"
                    ? "Enter The Head of text"
                    : "ادخل عنوان النص"
                }
                onChange={(e) => setHeadText(e.target.value)}
              />
              <textarea
                name="desc"
                className="h-[150px] w-[90%] bg-transparent rounded-sm outline-none border p-2"
                placeholder={
                  language == "en" ? "Enter The Description" : "ادخل الوصف"
                }
                onChange={(e) => setDescText(e.target.value)}
              />
              <div className="flex gap-4">
                <button
                  className="bg-red px-3 py-1 rounded-sm hover:bg-light_red anim"
                  onClick={() => {
                    setOpenModule(false);
                  }}
                >
                  {language == "en" ? "Cancel" : "الغاء"}
                </button>
                <button
                  className="bg-green px-3 py-1 rounded-sm hover:bg-light_green anim"
                  onClick={() => {
                    {
                      adding ? insertAboutUs() : updateAboutUs();
                    }
                    setOpenModule(false);
                  }}
                >
                  {language == "en" ? "Done" : "تم"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {userRole ? <Services /> : null}
    </MotionWraping>
  );
};

export default Page;
