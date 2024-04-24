"use client";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import InfoModul from "../InfoModul";
import { useEffect, useState } from "react";
import accessability from "@/app/lib/accessability";
const TableOfCases = ({
  CasesData,
  showDate,
  showCost,
  showModule,
  moduleType,
}: {
  CasesData: any;
  showDate: boolean;
  showCost?: boolean;
  showModule: boolean;
  moduleType?: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // ----------- IF THE MODULE OPEN ----------
  const [dataItem, setdataItem] = useState(); // ----------- SET THE DATA TO SHOW IT IN THE MODULE ----------
  const theme = useSelector((state: RootState) => state.theme).theme;
  const language = useSelector((state: RootState) => state.lang).language;
  const emptyText = language == "en" ? "No Cases Found" : "لا يوجد  حالات";
  const [userRole, setUserRole] = useState<boolean>();

  // Accessability
  useEffect(() => {
    const isAdmin = async () => {
      const access: boolean = await accessability();
      setUserRole(access);
    };
    isAdmin();
  }, []);
  // ----------- ARABIC ----------
  const ar = {
    name: "الاسم",
    age: "العمر",
    booking_date: "التاريخ",
    cost: "التكلفة",
    extra_cost: "ت إضافية",
    mobile: "الهاتف",
  };
  // ----------- ENGLISH ----------
  const en = {
    name: "Name",
    age: "Age",
    booking_date: "Date",
    cost: "cost",
    extra_cost: "ex cost",
    mobile: "mobile",
  };
  const text = language == "en" ? en : ar;
  return (
    <div className="overflow-x-auto">
      {/* ----------------- TABLE CONTAINR -------------------- */}
      <div className="min-w-[670px]">
        {/* ----------------- TABLE HEAD -------------------- */}
        <div
          className={`table-row ${
            theme == "dark" ? "bg-blck" : "bg-light_white"
          }  shadow-md py-3 font-semibold `}
        >
          <span className="flex-1 min-w-[170px] ">{text.name}</span>
          <span className=" cost ">{text.age}</span>
          {showDate ? (
            <span className="min-w-[110px]">{text.booking_date}</span>
          ) : null}
          {showCost ? <span className=" cost  ">{text.cost}</span> : null}
          {showCost ? <span className=" cost ">{text.extra_cost}</span> : null}
          <span className=" cost ">{text.mobile}</span>
          {/* ----------------- TABLE BODY -------------------- */}
        </div>
        {CasesData.length !== 0 ? (
          CasesData.map((item: any, index: number) => (
            <div key={item.id}>
              {isOpen ? (
                // If there module abile to show
                showModule && userRole ? (
                  <InfoModul
                    item={dataItem}
                    setIsOpen={setIsOpen}
                    theme={theme}
                    language={language}
                    moduleType={`${moduleType}`}
                  />
                ) : null
              ) : null}
              <div
                className="table-row cursor-pointer shadow-sm   hover:shadow-md p-2 h-[50px]"
                onClick={() => {
                  setIsOpen(!isOpen);
                  // ----------- SET THE DATA TO SHOW IT IN THE MODULE ----------
                  setdataItem(item);
                }}
              >
                <span
                  className={`flex-1 min-w-[170px]  table-cel  ${
                    theme == "dark" ? "bg-light_blck" : " bg-light_white "
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={` cost  table-cel ${
                    theme == "dark" ? "bg-light_blck" : " bg-light_white "
                  }`}
                >
                  {item.age}
                </span>
                {showDate ? (
                  <span
                    className={`min-w-[110px] table-cel ${
                      theme == "dark" ? "bg-light_blck" : " bg-light_white "
                    }`}
                  >
                    {item.booking_date}
                  </span>
                ) : null}
                {showCost ? (
                  <span
                    className={` cost  table-cel ${
                      theme == "dark" ? "bg-light_blck" : " bg-light_white "
                    }`}
                  >
                    {item.cost}
                  </span>
                ) : null}
                {showCost ? (
                  <span
                    className={` cost  table-cel ${
                      theme == "dark" ? "bg-light_blck" : " bg-light_white "
                    }`}
                  >
                    {item.extra_cost}
                  </span>
                ) : null}
                <span
                  className={` cost  table-cel ${
                    theme == "dark" ? "bg-light_blck" : " bg-light_white "
                  }`}
                >
                  {item.mobile}
                </span>
              </div>
              {/* ----------------- MAKE THE GREEN DATE BETWEEN THE DEFFRENT DAYS -------------------- */}
              {CasesData[index]?.booking_date !==
              CasesData[index + 1]?.booking_date ? (
                <h2 className="w-full text-xs my-1 font-semibold text-center text-green">
                  {CasesData[index + 1]?.booking_date}
                </h2>
              ) : null}
            </div>
          ))
        ) : (
          <h2 className="text-red font-semibold text-center w-[400px] p-4">
            {emptyText}
          </h2>
        )}
      </div>
    </div>
  );
};

export default TableOfCases;
