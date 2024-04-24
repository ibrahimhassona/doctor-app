"use client";

import { todayCasesFromSupaBase } from "@/app/lib/analized-data";
import { RootState } from "@/app/redux/store";
import { useEffect, useState } from "react";
import { FaPersonBooth } from "react-icons/fa6";
import { useSelector } from "react-redux";
const CasesAmountToday = () => {
  // ------------- LANGUAGE & COUNT OF TODAY -------------
  const language = useSelector((state: RootState) => state.lang).language;
  const incoming_cases_today = language == "en" ? "Today Cases" : "حالات اليوم";
  const [data, setData] = useState<any>();
  useEffect(() => {
    const countOfToday = async () => {
      const count = await todayCasesFromSupaBase();
      setData(count);
    };
    countOfToday();
  }, []);
  return (

        <div className="feature-item">
          <div>
            <FaPersonBooth className="feature-icon" />
          </div>
          <h2 className="feature-num">{data && data.length} </h2>
          <h1 className="feature-text">{incoming_cases_today}</h1>
        </div>

  );
};

export default CasesAmountToday;
