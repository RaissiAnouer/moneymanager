import React, { useEffect, useState } from "react";
import { prepareLineChartData } from "./prepareLineChartData";
import { Plus } from "lucide-react";
import CustomLineChart from "./CustomLineChart";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareLineChartData(transactions, "expense");
    console.log("chart Data check:", result);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold text-gray-800">
            Expense Overview
          </h5>
          <p className="text-sm text-gray-400 mt-0 5">
            Track your expenses over time and analyse your expense trends.
          </p>
        </div>
        <button className="primary-add-btn" onClick={onAddExpense}>
          <Plus size={15} className="text-lg" />
          Add Expense
        </button>
      </div>
      <div className="w-full h-72">
        <CustomLineChart transactions={chartData} type={"expense"} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
