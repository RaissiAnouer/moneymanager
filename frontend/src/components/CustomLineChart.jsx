import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CustomLineChart = ({ transactions }) => {
  // Soft purple color
  const color = "#7c3aed";

  return (
    <ResponsiveContainer width="99%" height="100%">
      <AreaChart
        data={transactions}
        margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
      >
        {/* Gradient for the area fill */}
        <defs>
          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
            <stop offset="95%" stopColor={color} stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f3f4f6"
        />

        <XAxis
          dataKey="label"
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dy={10}
        />

        <YAxis
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            value >= 1000 ? `${value / 1000}k` : value
          }
        />

        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload || !payload.length) return null;

            const data = payload[0].payload;

            return (
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  padding: "12px",
                  minWidth: "150px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {/* Day label */}
                <div
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
                  {data.label}
                </div>

                {/* Total amount */}
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  Total:{" "}
                  <span style={{ color }}>
                    {data.amount.toLocaleString()} DT
                  </span>
                </div>

                {/* Breakdown / details */}
                {data.breakdown && Object.keys(data.breakdown).length > 0 && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      borderTop: "1px solid #f3f4f6",
                      paddingTop: "8px",
                    }}
                  >
                    <div style={{ fontWeight: "500", marginBottom: "4px" }}>
                      Details:
                    </div>
                    {Object.entries(data.breakdown).map(
                      ([category, amount]) => (
                        <div key={category} style={{ marginBottom: "2px" }}>
                          {category}:{" "}
                          <span style={{ color }}>
                            {amount.toLocaleString()} DT
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            );
          }}
        />

        {/* Area chart */}
        <Area
          type="monotone"
          dataKey="amount"
          stroke={color}
          strokeWidth={3}
          fill="url(#colorAmount)"
          dot={{ r: 4, fill: color, strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
