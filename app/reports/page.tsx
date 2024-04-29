"use client";
import { useEffect, useState } from "react";
import { useIncomeTotal, useMonthlyReports, reports } from "../lib/analized-data";
import MotionWraping from "../_component/MotionWraping";
import Heading from "../_component/smallcomponent/Heading";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import accessability from "../lib/accessability";
const Page = () => {
  // --------- DATA & LANGUAGES & THEME ------
  const theme = useSelector((state: RootState) => state.theme).theme;
  const languges = useSelector((state: RootState) => state.lang).language;
  const monthlyData = useMonthlyReports();
  const incomeT = useIncomeTotal();
  const [userRole, setUserRole] = useState<boolean>();

  // Accessability
  useEffect(() => {
    const isAdmin = async () => {
      const access: boolean = await accessability();
      setUserRole(access);
    };
    isAdmin();
  }, [userRole]);

  return (
    <MotionWraping>
      {/* ----------------- HEADING ------------------*/}
      <Heading ar="التقارير" en="Reports" />
      {userRole && <div className="anim">
        {/* ----------------- SHOW THE DATA ------------------*/}
        {monthlyData && (
          <div className="w-[600px] max-md:w-[350px] mt-8 m-auto flex flex-col">
            <div className="table-row mb-4">
              <span className="table-cel w-[150px] font-semibold">
                {languges == "en" ? "Month" : "الشهر"}
              </span>
              <span className="table-cel w-[150px] font-semibold">
                {languges == "en" ? "Cases Count" : "عدد الحالات"}
              </span>
              <span className="table-cel w-[150px] font-semibold">
                {languges == "en" ? "Revenues" : "الايرادات"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {monthlyData &&
                monthlyData.map((month, index) => (
                  <div
                    key={index}
                    className={`table-row font-semibold ${
                      theme == "dark" ? "bg-light_blck" : "bg-light_white"
                    }`}
                  >
                    <span className="table-cel  w-[150px] ">{month.month}</span>
                    <span className="table-cel  w-[150px]">{month.count}</span>
                    <span className="table-cel  w-[150px] text-light_green">
                      {month.totalCost}
                    </span>
                  </div>
                ))}
            </div>
            {/* ----------INCOME TOTAL---------- */}
            <div
              className={`mt-10 table-row font-semibold ${
                theme == "dark" ? "bg-light_blck" : "bg-light_white"
              }`}
            >
              <span className="table-cel  w-[150px] ">
                {languges == "en" ? "Income Total" : "إجمالي الدخل"}
              </span>
              <span className="table-cel  w-[150px] text-light_green">
                {incomeT}
              </span>
            </div>
          </div>
        )}
      </div>}
    </MotionWraping>
  );
};

export default Page;
