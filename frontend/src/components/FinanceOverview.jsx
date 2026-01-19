import React from "react";
import CustomPieChart from "./CustomPieChart";
import { addThousandsSeparator } from "../util/addThousandsSeperator";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const colors = ["#591688", "#a0090e", "#016630"];

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={` ${addThousandsSeparator(totalBalance)}TND`}
        COLORS={colors}
      />
    </div>
  );
};

export default FinanceOverview;
