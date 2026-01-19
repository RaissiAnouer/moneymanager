export const prepareIncomeLineChartData = (transactions) => {
  console.log("transactions", transactions);
  if (!transactions) {
    return [];
  }

  // Aggregate amounts by day of the month (1-31)
  const dailyTotals = transactions.reduce((acc, curr) => {
    const date = new Date(curr.date);

    // Get the day of the month (1-31)
    const day = date.getDate();
    const label = `Day ${day}`;

    if (!acc[label]) {
      acc[label] = {
        label: label,
        day: day, // Store numeric day for sorting
        amount: 0,
        sources: {}, // Track income sources
        transactions: [], // Store individual transactions for details
      };
    }

    // Add to total amount
    acc[label].amount += Number(curr.amount);

    // Track sources (e.g., Salary, Freelance, etc.)
    const source = curr.categoryName || curr.name || "Other";
    if (!acc[label].sources[source]) {
      acc[label].sources[source] = 0;
    }
    acc[label].sources[source] += Number(curr.amount);

    // Store transaction details
    acc[label].transactions.push({
      description: curr.name || "Unknown",
      amount: Number(curr.amount),
      source: source,
      category: curr.categoryName,
      date: curr.date,
    });

    return acc;
  }, {});

  // Convert to array and sort by day (1-31)
  const result = Object.values(dailyTotals)
    .sort((a, b) => a.day - b.day)
    .map(({ label, amount, sources, transactions }) => ({
      label,
      amount,
      sources, // Object with source names as keys and amounts as values
      transactions, // Array of individual transactions
      // Create a formatted details string for tooltip
      details: Object.entries(sources)
        .map(([source, amt]) => `${source}: ${amt.toLocaleString()} DT`)
        .join("\n"),
    }));

  console.log("Prepared chart data:", result);
  return result;
};
