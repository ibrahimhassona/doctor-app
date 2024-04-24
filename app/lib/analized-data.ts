import { useEffect, useState } from "react";
import { supabaseClient } from "./supabaseClient";

const date = new Date();
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, "0");
const day = date.getDate().toString().padStart(2, "0");
const todayFormat = `${year}-${month}-${day}`;
const tomorrowFormat = `${year}-${month}-${Number(day) + 1}`;

const supabase = supabaseClient;

// ---------------Returen The data of Agenda from supaBase---------------
export const NextDaysFromSupaBase = async () => {
  try {
    let { data, error } = await supabase.from("all").select("*").gte("booking_date", todayFormat);
    if (error) {
      throw error;
    }
    return data?.sort((a, b) => new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime());
  } catch (error: any) {
    console.error("Error fetching data from Supabase:", error.message);
  }
};

//------------Returen The data of Tomorrow from supabase---------------
export const tomorrowCasesFromSupaBase = async () => {
  try {
    let { data, error } = await supabase.from("all").select("*").eq("booking_date", tomorrowFormat);
    if (error) {
      throw error;
    }
    return data;
  } catch (error: any) {
    console.error("Error fetching data from Supabase:", error.message);
  }
};

//------------Returen The data of Today from supabase---------------
export const todayCasesFromSupaBase = async () => {
  try {
    let { data, error } = await supabase.from("all").select("*").eq("booking_date", todayFormat);
    if (error) {
      throw error;
    }
    return data;
  } catch (error: any) {
    console.error("Error fetching data from Supabase:", error.message);
  }
};

//------------Returen The data form 'Previous cases' Table to show it in Previous cases page ---------------
export const previousCasesFromSupabase = async () => {
  try {
    let { data, error } = await supabase.from("previous_cases").select("*");
    if (error) {
      throw error;
    }
    return data?.sort((a, b) => new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime());
  } catch (error: any) {
    console.log('There an error when we try to get data from "Previous_cases" Table', error.message);
  }
};

// ------------- REPORTS -----------------

export const reports = async () => {
  try {
    let { data, error } = await supabase.from("previous_cases").select("*");
    if (error) {
      throw error;
    }
    return data;
  } catch (error: any) {
    console.log('There an error when we try to get data from "Previous_cases" Table', error.message);
  }
};

export const useMonthlyReports = () => {
  const [data, setData] = useState<any[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prevCases: any = await reports();
        setData(prevCases);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const groupedData = data?.reduce((acc, curr) => {
    try {
      const date = new Date(curr.booking_date);
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const formattedDate = `${month} ${year}`;

      if (!acc[formattedDate]) {
        acc[formattedDate] = { totalCost: 0, count: 0 };
      }

      acc[formattedDate].totalCost += curr.total_cost;
      acc[formattedDate].count++;
    } catch (error) {
      console.error("Error processing data:", error);
    }

    return acc;
  }, {});

  const result = Object.keys(groupedData || {}).map((key) => ({
    month: key, // Keep the key as a string for display purposes
    totalCost: groupedData[key].totalCost,
    count: groupedData[key].count,
  }));
  return result;
};

export const useIncomeTotal = () => {
  const monthlyData = useMonthlyReports();
  if (monthlyData) {
    return monthlyData.reduce((acc, curr) => {
      return acc + curr.totalCost;
    }, 0); // Provide 0 as the initial value for the accumulator
  }
  return 0; // Return 0 if the result array is falsy or empty
};

// ----------- FETCH THE ABOUT US DATA FOR WEBSITE ----------

export const getAboutUsData = async () => {
  try {
    let { data, error } = await supabase.from("about_us").select("*");
    if (error) {
      throw error;
    }
    return data;
  } catch (error: any) {
    console.log('There an error when we try to get data from "Previous_cases" Table', error.message);
  }
};

// ----------- FETCH THE SERVICES DATA FOR WEBSITE ----------

export const getServicesData = async () => {
  try {
    let { data, error } = await supabase.from("services").select("*");
    if (error) {
      throw error;
    }
    return data;
  } catch (error: any) {
    console.log('There an error when we try to get data from "services" Table', error.message);
  }
};


