export const prepareLineChartData = (transactions, type) => {
  if (!transactions || transactions.length === 0) return [];

  console.log("chart type:", type); // "expense" or "income"
  console.log("transactions:", transactions);

  const dailyTotals = transactions.reduce((acc, curr) => {
    const date = new Date(curr.date);
    const day = date.getDate();
    const label = `Day ${day}`;

    if (!acc[label]) {
      acc[label] = {
        label,
        day,
        amount: 0,
        breakdown: {},
        transactions: [],
      };
    }

    const amount = Number(curr.amount) || 0;
    acc[label].amount += amount;

    const groupKey = curr.categoryName || curr.name || "Other";

    acc[label].breakdown[groupKey] =
      (acc[label].breakdown[groupKey] || 0) + amount;

    acc[label].transactions.push({
      description: curr.name || "Unknown",
      amount,
      category: curr.categoryName,
      date: curr.date,
      type, // ← use the passed type here if needed
    });

    return acc;
  }, {});

  return Object.values(dailyTotals)
    .sort((a, b) => a.day - b.day)
    .map(({ label, amount, breakdown, transactions }) => ({
      label,
      amount,
      breakdown,
      transactions,
      details: Object.entries(breakdown)
        .map(([key, amt]) => `${key}: ${amt.toLocaleString()} DT`)
        .join("\n"),
    }));
};
