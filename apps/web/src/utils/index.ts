export function calculateDiffPercent(
  previousDaySales: number,
  currentDaySales: number
): string {
  // Calculate the percentage difference
  const percentageDifference =
    ((currentDaySales - previousDaySales) / previousDaySales) * 100;

  // Format the result as a string with a "+" or "-" sign
  const sign = percentageDifference >= 0 ? "+" : "-";
  const formattedPercentage = `${sign}${Math.abs(percentageDifference).toFixed(
    1
  )}%`;

  return formattedPercentage;
}
