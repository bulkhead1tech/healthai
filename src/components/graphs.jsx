"use client ";
import React from "react";
import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Bar, PolarArea,Pie, Line } from "react-chartjs-2";

const graphs = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch("/api/fitness_data");
      const data = await response.json();
      setdata(data.data);
      console.log(data.data)
    };
    fetcher();
  }, []);

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto ">
      <div className=" h-full w-full px-5 flex flex-col overflow-y-scroll gap-y-5">
            {" "}
            <div className="text-xl px-1 items-end flex h-20 w-full text-semibold">
              Heart Rate:
            </div>
            <div id="chart" className="h-1/2  rounded-4xl flex flex-col py-2">
              <Bar
                className="h-full w-full"
                options={{ maintainAspectRatio: false }}
                data={{
                  labels: ["day1", "day-2", "day-3", "day-4", "day-5"],
                  datasets: [
                    {
                      label: "Heartrate",
                      borderRadius: 8,

                      backgroundColor: "rgba(234, 179, 8, 1)",
                      data: data.map((data)=>data.heartrate),
                    },
                  ],
                }}
              />
            </div>
            <div className="text-xl px-1 items-end flex h-20 w-full text-semibold">
            Oxygen saturation:
            </div>
            <div className="h-1/2  rounded-4xl">
              <Line
                className="h-full"
                options={{ maintainAspectRatio: true }}
                data={{
                  labels: ["day1", "day-2", "day-3", "day-4", "day-5"],
                  datasets: [
                    {
                      label: "oxygen_saturation",
                      borderRadius: 8,
                      borderColor: "rgba(234, 179, 8, 1)",
                      backgroundColor: "rgba(234, 179, 8, 1)",
                      data: data.map((data)=>data.oxygen_saturation),
                    },
                  ],
                }}
              />
            </div>
            <div className="text-xl px-1 items-end flex h-20 w-full text-semibold">
            Respiratory rate            </div>
            <div className="h-1/2 w-full  rounded-4xl">
           
              <Pie
                className="h-4/5 w-full"
                options={{ maintainAspectRatio: true }}
                data={{
                  labels: ["day1", "day-2", "day-3", "day-4", "day-5"],
                  datasets: [
                    {
                      label: "Respiratory rate",
                      borderRadius: 8,
                      borderColor: "rgba(0, 0, 0, 1)",
                      backgroundColor: [
                        "rgba(58, 255, 86, 1)",
                        "rgba(255, 48, 79, 1)",
                        "rgba(48, 218, 255, 1)",
                        "rgba(255, 221, 51, 1)",
                        "rgba(204, 51, 255, 1)"
                      ],
                      data: data.map((data)=>data.respiratory_rate),
                    },
                  ],
                }}
              />
            </div>
            <div className="text-xl px-1 items-end flex h-20 w-full text-semibold">
            Electrocardiogram
            </div>
            <div className="h-1/2 bg-gray-900 w-full flex flex-col px-5 py-2 font-sans text-xl text-yellow-400 rounded-4xl">
           {data.map((data, i)=>(<h1>Day-{i+1}{" "}:{" "}{data.electrocardiogram} </h1>))}
             
         </div>
            <div className="text-xl px-1 items-end flex h-20 w-full text-semibold">
            Temperature
            </div>
            <div className="h-1/2 w-full  rounded-4xl">
           
              <PolarArea
                className="h-4/5 w-full"
                options={{ maintainAspectRatio: true }}
                data={{
                  labels: ["day1", "day-2", "day-3", "day-4", "day-5"],
                  datasets: [
                    {
                      label: "Temperature",
                      borderColor: "rgba(0, 0, 0, 1)",
                      backgroundColor: [
                        "rgba(58, 255, 86, 1)",
                        "rgba(255, 48, 79, 1)",
                        "rgba(48, 218, 285, 1)",
                        "rgba(255, 221, 51, 1)",
                        "rgba(204, 51, 255, 1)"
                      ],
                      data: data.map((data)=>data.temperature),
                    },
                  ],
                }}
              />
            </div>
            <div className="text-xl px-1 items-end flex h-20 w-full text-semibold">
            Nutrition
            </div>
            <div className="h-1/2 bg-gray-900 w-full flex flex-col px-5 py-2 font-sans text-xl text-yellow-400 rounded-4xl">
           {data.map((data, i)=>(<h1>Day-{i+1}{" "}:{" "}{data.nutrition} </h1>))}
             
         </div>
       
                </div>
    </div>
  );
};

export default graphs;
