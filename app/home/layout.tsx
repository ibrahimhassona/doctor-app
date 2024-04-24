"use client";
import React, { useEffect, useState } from "react";
import FetuerWraping from "../_component/FetuerWraping";
import MotionWraping from "../_component/MotionWraping";
import accessability from "../lib/accessability";

const Layout = ({
  children,
  CasesAmountTomorrow,
  CasesAmountToday,
  CurrentMonth,
  MonthIncome,
  IncomeChart,
}: {
  children: React.ReactNode;
  CasesAmountTomorrow: React.ReactNode;
  CasesAmountToday: React.ReactNode;
  CurrentMonth: React.ReactNode;
  MonthIncome: React.ReactNode;
  IncomeChart: React.ReactNode;
}) => {
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
      {children}
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 justify-center flex-wrap max-sm:flex-col items-center">
          <FetuerWraping>{CasesAmountToday}</FetuerWraping>
          <FetuerWraping>{CasesAmountTomorrow}</FetuerWraping>
          {userRole && (
            <>
              <FetuerWraping>{CurrentMonth}</FetuerWraping>
              <FetuerWraping>{MonthIncome}</FetuerWraping>
            </>
          )}
        </div>
        <div className="feature-wraping h-auto w-[90%] mx-auto">
          {IncomeChart}
        </div>
      </div>
    </MotionWraping>
  );
};

export default Layout;
