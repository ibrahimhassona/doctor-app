"use client";
import { useEffect, useState } from "react";
import MotionWraping from "../_component/MotionWraping";
import Heading from "../_component/smallcomponent/Heading";
import { previousCasesFromSupabase } from "../lib/analized-data";
import TableOfCases from "../_component/smallcomponent/TableOfCases";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PreviousCasesPage = () => {
  const languges = useSelector((state: RootState) => state.lang).language;
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    const fetchPrevCases = async () => {
      const prevCases = await previousCasesFromSupabase();
      const filteredCases = prevCases?.filter(item => item?.name?.includes(search));
      setData(filteredCases);
    };

    fetchPrevCases();
  }, [search]);

  return (
    <MotionWraping>
      <Heading ar="الحالات السابقه " en="Previous Cases" />
      <div className="anim">
        <div className="w-full flex item-center my-8">
          <input
            type="text"
            onChange={(e)=>setSearch(e.target.value)}
            name="search"
            placeholder={`${
              languges == "en" ? "Search by name" : "بحث بالاسم"
            }`}
            className="px-2 py-1 rounded-sm bg-transparent outline-none border m-auto"
          />
        </div>
        {data && (
          <TableOfCases
            showModule={true}
            CasesData={data}
            showDate={true}
            showCost={true}
          />
        )}
      </div>
    </MotionWraping>
  );
};

export default PreviousCasesPage;
