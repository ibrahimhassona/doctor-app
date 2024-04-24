"use client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getServicesData } from "../lib/analized-data";
import { supabaseClient } from "../lib/supabaseClient";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const Services = () => {
  const supabase = supabaseClient;
  const language = useSelector((state: RootState) => state.lang).language;
  const theme = useSelector((state: RootState) => state.theme).theme;
  // ----- DATA 'SERVICES' -------
  const [services, setServices] = useState<any>();
  // ------- SERVICE ITEM -------------
  const [dataServiceItem, setDataServiceItem] = useState<any>();
  const [servicesIndex, setServicesIndex] = useState<number>(-1);
  // ----- CURRENT SERVICE IN MODULE ------
  const [descService, setDescService] = useState<string>();
  const [headService, setHeadService] = useState<string>();
  const [openModule, setOpenModule] = useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);
  // ------------ FETCH SERVECES DATA --------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getServicesData();
        setServices(result);
      } catch (error) {
        console.error("Error fetching services  data:", error);
      }
    };
    fetchData();
  }, []);
  //  --------- UPDATE THE ITEM FROM SERVICES TABLE -------
  const updateServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .update({ desc: descService, head: headService })
        .eq("id", dataServiceItem.id)
        .select();

      if (error) {
        throw new Error(error.message);
      } else {
        // Alert
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
      console.error("Error updating SERVICES:", error.message);
    }
  };
  //  --------- INSERT THE ITEM FROM ANOUT US TABLE -------
  const insertServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .insert({ desc: descService, head: headService })
        .select();

      if (error) {
        throw new Error(error.message);
      } else {
        // Alert
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
      console.error("Error Inserting SERVICES :", error.message);
    }
  };

  // --------- OPEN 'SERVICE' TEXT------------
  const toggleService = (index: number) => {
    setServicesIndex(index === servicesIndex ? -1 : index);
  };

  return (
    <div className="flex flex-col gap-2 relative mt-8">
      <h1 className=" text-light_green font-semibold mx-6 text-xl">
        {language == "en" ? "Our Services" : "خدماتنا"}
      </h1>
      <button
        onClick={() => {
          setOpenModule(true);
          setAdding(true);
        }}
        className="bg-green px-3 py-1 rounded-sm hover:bg-light_green anim w-fit mx-auto"
      >
        {language == "en" ? "Add Service" : "إضافة خدمه"}
      </button>
      {services &&
        services.map((service: any, index: number) => (
          <div
            key={index}
            className="p-2 rounded-sm shadow-sm mx-auto cursor-pointer border w-[80%]"
            onClick={() => toggleService(index)}
          >
            <div className="flex justify-between">
              <h2 className="font-semibold cursor-pointer ">{service.head}</h2>
              <button
                className="bg-green px-3 py-1 rounded-sm hover:bg-light_green anim"
                onClick={() => {
                  setDataServiceItem(service);
                  setOpenModule(true);
                }}
              >
                {language == "en" ? "Editing" : "تعديل"}
              </button>
            </div>
            <p
              className={`mt-2 anim px-4 ${
                servicesIndex === index ? "block " : "hidden "
              }`}
            >
              {service.desc}
            </p>
          </div>
        ))}

      {/* ------------- MODULE ------------- */}
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
          {/*-------- IF ADDING DONT SHOW ITEMS IN MODULE ELSE => SHOW ITEM TO UPDATE IT--------- */}
          {adding !== true && (
            <>
              <h1 className="font-semibold">{dataServiceItem?.head}</h1>
              <p className="">{dataServiceItem?.desc}</p>
            </>
          )}
          <div className=" close-module" onClick={() => setOpenModule(false)}>
            <IoClose />
          </div>
          <textarea
            name="desc"
            className="h-[50px] w-[90%] bg-transparent rounded-sm outline-none border p-2"
            placeholder={
              language == "en" ? "Entr The Head of text" : "ادخل عنوان النص"
            }
            onChange={(e) => setHeadService(e.target.value)}
          />
          <textarea
            name="desc"
            className="h-[150px] w-[90%] bg-transparent rounded-sm outline-none border p-2"
            placeholder={
              language == "en" ? "Entr The Decsriptopn" : "ادخل الوصف"
            }
            onChange={(e) => setDescService(e.target.value)}
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
                  adding ? insertServices() : updateServices();
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
  );
};

export default Services;