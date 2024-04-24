"use client";
import MotionWraping from "../_component/MotionWraping";
import { todayCasesFromSupaBase } from "../lib/analized-data";
import TableOfCases from "../_component/smallcomponent/TableOfCases";
import Heading from "../_component/smallcomponent/Heading";
import { useEffect, useState } from "react";

const Page = () => {
  // ----------------- GET THE DATA FROM ANALIZED AND PUTING IN STATE TO PASS IT TO SHOW ------------------
  const [dataToaday, setDataToday] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const todayCases = await todayCasesFromSupaBase();
      setDataToday(todayCases);
    };
    fetchData();
  }, []);

  return (
    <MotionWraping>
      {/* ----------------- HEADING ------------------*/}
      <Heading ar="اعمال اليوم" en="Daily Tasks" />
      <div className="anim">
        {/* ----------------- SHOW THE DATA ------------------*/}
        {dataToaday && (
          <TableOfCases showModule={true} CasesData={dataToaday} showDate={false} moduleType="move" showCost={true} />
        )}
      </div>
    </MotionWraping>
  );
};

export default Page;
