import React from "react";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>
      <CustomPieChart
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />
    </div>
  );
};

export default FinanceOverview;
