import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const CustomPieChart = ({
  totalBalance = 0,
  totalIncome = 0,
  totalExpense = 0,
}) => {
  // 1. Check if we have data to display
  const hasData = totalIncome > 0 || totalExpense > 0;

  // 2. Prepare data. If no data, show a "placeholder" gray slice
  const data = hasData
    ? [
        { name: "Income", value: totalIncome, color: "#22c55e" },
        { name: "Expense", value: totalExpense, color: "#ef4444" },
      ]
    : [{ name: "No Data", value: 1, color: "#f3f4f6" }]; // Light gray placeholder

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm">
      <div className="relative w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={hasData ? 8 : 0} // Only pad if we have real slices
              dataKey="value"
              stroke="none"
              // Disable animation if there's no data to prevent NaN errors
              isAnimationActive={hasData}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {hasData && <Tooltip />}
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">
            Balance
          </span>
          <span className="text-2xl font-bold text-gray-800">
            ${totalBalance.toLocaleString()}
          </span>
        </div>
      </div>

      {hasData && (
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <p className="text-sm font-medium text-gray-600">Income</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <p className="text-sm font-medium text-gray-600">Expense</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPieChart;
