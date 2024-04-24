"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface GrowthChartProps {
  growthData: { date: string; growthRate: number }[];
}

const GrowthChart: React.FC<GrowthChartProps> = ({ growthData }) => {
  const language = useSelector((state: RootState) => state.lang).language;
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart instance
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx: any = chartRef.current.getContext("2d");

      // Create new chart instance
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: growthData.map((entry) => entry.date),
          datasets: [
            {
              label: language == "en" ? "Growth Rate" : "معدل النمو",
              data: growthData.map((entry) => entry.growthRate),
              borderWidth: 2,
              borderColor: "#2c9765",
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "time",
              time: {
                unit: "month",
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => `${value}`,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${context.parsed.y}%`,
              },
            },
          },
        },
      });
    }
  }, [growthData, language]); // Include 'language' in the dependency array

  return (
    <div className="max-w-[700px] mx-auto">
      <canvas ref={chartRef} />
    </div>
  );
};

export default GrowthChart;
