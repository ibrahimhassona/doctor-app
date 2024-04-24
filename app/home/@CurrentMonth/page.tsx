"use client";
import { GiTakeMyMoney } from "react-icons/gi";

import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { previousCasesFromSupabase } from "@/app/lib/analized-data";
const CurrentMonth = () => {
  // ----------- LANGUAGE & FORMATE DATE & HANDLE THE DATA FOR CURRENT MONTH INCOME -----------------
  const language = useSelector((state: RootState) => state.lang).language;
  const current_month_income =
    language == "en" ? "Current Month Income" : "الدخل للشهر الحالى";
  const currentMonth = new Date().getMonth() + 1; // Adjusting for zero-based index
  const currentYear = new Date().getFullYear();
  const currMonthDate = `${currentYear}-${
    currentMonth < 10 ? "0" : "" // ---- TO PUT ZERO OR NO ----
  }${currentMonth}`;
  const [data, setData] = useState<any>();
  useEffect(() => {
    const currentNomthIncom = async () => {
      const currMontheData = await previousCasesFromSupabase();
      setData(currMontheData);
    };
    currentNomthIncom();
  }, []);
  const finalData = data
    ?.filter((e: any) => e?.booking_date.slice(0, 7) == currMonthDate)
    .reduce((acc: any, curr: any) => Number(acc) + Number(curr.total_cost), 0);
  return (
        <div className="feature-item ">
          <div>
            <GiTakeMyMoney className="feature-icon" />
          </div>
          <h2 className="feature-num">{finalData}</h2>
          <h1 className="feature-text">{current_month_income}</h1>
        </div>
  );
};

export default CurrentMonth;
