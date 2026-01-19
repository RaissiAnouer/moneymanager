import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const CustomPieChart = ({ data, label, totalAmount }) => {
  // Colors matching your FinanceOverview component
  const COLORS = ["#591688", "#a0090e", "#016630"];

  return (
    <div className="relative w-full h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            formatter={(value) => `${value.toLocaleString()} TND`}
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80} // Donut thickness
            outerRadius={100}
            paddingAngle={8} // Space between segments
            dataKey="amount"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Dynamic Central Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-2xl font-bold text-gray-900">{totalAmount}</p>
      </div>
    </div>
  );
};

export default CustomPieChart;
