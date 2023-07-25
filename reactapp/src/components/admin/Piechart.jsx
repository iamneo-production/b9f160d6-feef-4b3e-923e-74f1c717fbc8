import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart = ({ data }) => {
  return (
    <main className="flex justify-around items-center my-4 gap-6">
      <Pie data={data.data2} />
      <Doughnut data={data.data} />
    </main>
  );
};

export default Piechart;
