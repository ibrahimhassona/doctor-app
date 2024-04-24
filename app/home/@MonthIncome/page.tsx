"use client";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { previousCasesFromSupabase } from "@/app/lib/analized-data";
const MonthIncome = () => {
  // ----------- LANGUAGE & FORMATE DATE & HANDLE THE DATA FOR CURRENT MONTH INCOME -----------------
  const language = useSelector((state: RootState) => state.lang).language;
  const month_income = language == "en" ? "Last Month Income" : "الدخل الشهر الماضى";
  const lasttMonth = new Date().getMonth() ; // Adjusting for zero-based index
  const currentYear = new Date().getFullYear();
  const lastMonthDate = `${currentYear}-${
    lasttMonth < 10 ? "0" : "" // ---- TO PUT ZERO OR NO ----
  }${lasttMonth}`;
  const [data, setData] = useState<any>();
  useEffect(() => {
    const currentNomthIncom = async () => {
      const lastMontheData = await previousCasesFromSupabase();
      setData(lastMontheData);
    };
    currentNomthIncom();
  }, []);
  const finalData = data
    ?.filter((e: any) => e?.booking_date.slice(0, 7) == lastMonthDate)
    .reduce((acc: any, curr: any) => Number(acc) + Number(curr.total_cost), 0);
  return (

<div className="feature-item">
      <div><FaMoneyBillTrendUp className="feature-icon "/></div>
      <h2 className="feature-num">{finalData}</h2>
      <h1 className="feature-text">{month_income}</h1>
    </div>
  );
};

export default MonthIncome;
