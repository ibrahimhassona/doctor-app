"use client";
import GrowthChart from "@/app/_component/GrowthChart";
import { useMonthlyReports } from "@/app/lib/analized-data";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

const IncomeChart = () => {
  // -- HERE WE DO ANALIZING ON ALL DATA AN SHOW IT {NEED TO MAKE JUST 6 MONTHES AS EDITING } -------
  const language = useSelector((state: RootState) => state.lang).language;
  const data = useMonthlyReports(); // ------ from analized data --
  const growthData = data.map((item) => {
    // get the year and the month from the data .
    const [monthName, year] = item.month.split(" ");
    //-- convert name of month to number
    const monthNumber =
      new Date(Date.parse(`${monthName} 1, ${year}`)).getMonth() + 1;
    //--- Do the required data format ----
    const date = `${year}-${monthNumber.toString().padStart(2, "0")}`;
    return { date, growthRate: item.totalCost };
  });
  return (
    <div>
      <h1 className="text-lg">
        {language == "en" ? "Growth Rate" : "معدل النمو"}
      </h1>
      <div className="mx-auto w-full">
        {growthData && <GrowthChart growthData={growthData} />}
      </div>
    </div>
  );
};

export default IncomeChart;
