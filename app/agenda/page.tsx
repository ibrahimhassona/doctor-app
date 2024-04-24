"use client";
import { useEffect, useState } from "react";
import MotionWraping from "../_component/MotionWraping";
import Heading from "../_component/smallcomponent/Heading";
import TableOfCases from "../_component/smallcomponent/TableOfCases";
import { NextDaysFromSupaBase } from "../lib/analized-data";

const Page = () => {
  // ----------------- GET THE DATA FROM ANALIZED AND PUTING IN STATE TO PASS IT TO SHOW ------------------
  const [data, setData] = useState<any>();
  
  useEffect(() => {
    const fetchNextDaysData = async () => {
      const nextdays = await NextDaysFromSupaBase();
      setData(nextdays);
    };
    fetchNextDaysData();
  }, []);
  
  return (
    <MotionWraping>
      {/* ----------------- HEADING ------------------*/}
      <Heading ar="جدول الاعمال" en="Agenda" />
      <div className="anim">
        {/* ----------------- SHOW THE DATA ------------------*/}
        {data && <TableOfCases showModule={false} CasesData={data} showDate={true} showCost={false}/>}
      </div>
    </MotionWraping>
  );
};

export default Page;
