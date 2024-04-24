"use client";
import { tomorrowCasesFromSupaBase } from "@/app/lib/analized-data";
import { RootState } from "@/app/redux/store";
import { useEffect, useState } from "react";
import { FaPersonBooth } from "react-icons/fa6";
import { useSelector } from "react-redux";
const CasesAmountTomorrow = () => {
  // --------------- COUNT OF TOMORROW --------------
  const language = useSelector((state: RootState) => state.lang).language;
  const incoming_cases_tomorrow =
    language == "en" ? "Tomorrow Cases" : "حالات غدا";
  const [data, setData] = useState<any>();
  useEffect(() => {
    const countOfTomorrow = async () => {
      const count = await tomorrowCasesFromSupaBase();
      setData(count);
    };
    countOfTomorrow();
  }, []);

  return (

        <div className="feature-item">
          <div>
            <FaPersonBooth className="feature-icon" />
          </div>
          <h2 className="feature-num">{data && data.length}</h2>
          <h1 className="feature-text">{incoming_cases_tomorrow}</h1>
        </div>
  );
};

export default CasesAmountTomorrow;
