import { getTotalArrayValue } from "@/utils/common";
import { DONUT_CHART_CONFIG } from "./donut-chart.config";
import { DonutChartData, DonutChartDataItem } from "./donut-chart";

export function calculatePercentage(
  numbers: number[],
  total: number
): number[] {
  const percentageArray: number[] = [];

  numbers.forEach((number) => {
    const percentage = Math.round((number / total) * 100);

    percentageArray.push(percentage);
  });

  return percentageArray;
}

export function generateRandomNumbers(n: number): number[] {
  const min = 100;
  const max = 500;
  const result: number[] = [];

  for (let i = 0; i < n; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    result.push(randomNumber);
  }

  return result;
}

export const generateDonutChartData = (items: number) => {
  const generateNumbers = generateRandomNumbers(items);
  const total = getTotalArrayValue(generateNumbers);
  const generatePercentages = calculatePercentage(generateNumbers, total);

  const dataItems: DonutChartDataItem[] = generateNumbers.map(
    (value, index) => ({
      label: `Item ${index + 1}`,
      value,
      percentage: generatePercentages[index],
      color: DONUT_CHART_CONFIG.COLORS[index],
    })
  );
  const chartData: DonutChartData = {
    items: dataItems,
  };
  return chartData;
};
