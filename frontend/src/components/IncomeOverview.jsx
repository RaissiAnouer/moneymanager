import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "./prepareIncomeLineChartData";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    console.log("Chart Data Check:", result);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* 1. Header Section - Block layout instead of items-center to allow chart to breathe */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold text-gray-800">
            Income Overview
          </h5>
          <p className="text-sm text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button className="primary-add-btn" onClick={onAddIncome}>
          <Plus size={15} className="text-lg" /> Add Income
        </button>
      </div>
      {/* 2. Chart Container - Fixed height is essential here */}
      <div className="w-full h-72">
        <CustomLineChart transactions={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
