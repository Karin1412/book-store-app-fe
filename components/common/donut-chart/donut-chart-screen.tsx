import { getTotalArrayValue } from "@/utils/common";
import { useFont } from "@shopify/react-native-skia";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import DonutChart, { DonutChartData, DonutChartDataItem } from "./donut-chart";
import { DONUT_CHART_CONFIG } from "./donut-chart.config";
import {
  calculatePercentage,
  generateDonutChartData,
} from "./donut-chart.utils";
import DonutItem from "./donut-item";

interface Props {
  data?: DonutChartData;
}

export const DonutChartContainer = ({ data }: Props) => {
  const [donutItems, setDonutItems] = useState<DonutChartDataItem[]>([]);
  const sharedTotalValue = useSharedValue(0);
  const sharedDecimals = useSharedValue<number[]>([]);

  const setupChartData = (chartData: DonutChartData) => {
    const values = chartData.items.map((item) => item.value);
    const total = getTotalArrayValue(values);
    const percentages = calculatePercentage(values, total);
    const decimals = percentages.map(
      (number) => Number(number.toFixed(0)) / 100
    );
    sharedTotalValue.set(withTiming(total, { duration: 1000 }));
    sharedDecimals.set([...decimals]);

    const dataItems: DonutChartDataItem[] = chartData.items.map(
      (item, index) => ({
        label: `Item ${index + 1}`,
        value: item.value,
        percentage: percentages[index],
        color: DONUT_CHART_CONFIG.COLORS[index],
      })
    );

    setDonutItems(dataItems);
  };

  useEffect(() => {
    if (data) setupChartData(data);
    else setupChartData(generateDonutChartData(5));
  }, [data]);

  const sortedDonutItems = useMemo(() => {
    return donutItems.sort((a, b) => b.percentage - a.percentage);
  }, [donutItems]);

  const font = useFont(require("@/assets/fonts/Roboto-Bold.ttf"), 60);
  const smallFont = useFont(require("@/assets/fonts/Roboto-Light.ttf"), 25);

  if (!font || !smallFont) {
    return <View />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chartContainer}>
          <DonutChart
            radius={DONUT_CHART_CONFIG.RADIUS}
            gap={DONUT_CHART_CONFIG.GAP}
            strokeWidth={DONUT_CHART_CONFIG.STROKE_WIDTH}
            outerStrokeWidth={DONUT_CHART_CONFIG.OUTER_STROKE_WIDTH}
            font={font}
            smallFont={smallFont}
            totalValue={sharedTotalValue}
            numberItems={donutItems.length}
            decimals={sharedDecimals}
            colors={DONUT_CHART_CONFIG.COLORS}
            title="Total"
          />
        </View>

        <View style={styles.chartDescription}>
          {sortedDonutItems.map((item, index) => {
            return <DonutItem item={item} key={index} index={index} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    width: DONUT_CHART_CONFIG.RADIUS * 2,
    height: DONUT_CHART_CONFIG.RADIUS * 2,
    marginTop: 10,
  },
  chartDescription: {
    marginTop: 16,
    flexDirection: "column",
    gap: 4,
  },
  button: {
    marginVertical: 40,
    backgroundColor: "#f4f7fc",
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
});

export default DonutChartContainer;
