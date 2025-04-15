import { generateDonutChartData } from "@/components/common/donut-chart/donut-chart.utils";
import GridView from "@/components/common/grid/grid-view";
import ChartSection from "@/components/features/admin/home/chart-section";
import ReportCard from "@/components/features/admin/home/report-card";
import { ThemedView } from "@/components/ThemedView";
import { showSuccessMessage } from "@/libs/react-native-toast-message/toast";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
export default function AdminHomeScreen() {
  const [donutChartData, setDonutChartData] = React.useState(
    generateDonutChartData(4)
  );

  const handleGenerateData = () => {
    setDonutChartData(generateDonutChartData(4));
  };

  const handleOrderPress = () => {
    showSuccessMessage("Order card pressed!");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <GridView style={{ marginTop: 16 }}>
          <ReportCard
            title="Orders"
            value="2023"
            iconName="home"
            backgroundColor="blue"
            style={{ width: "48%" }}
            onPress={handleOrderPress}
          />
          <ReportCard
            title="Customers"
            value="102"
            iconName="person"
            backgroundColor="green"
            style={{ width: "48%" }}
          />
          <ReportCard
            title="Stocks"
            value="1015"
            iconName="cube"
            backgroundColor="red"
            style={{ width: "48%" }}
          />
          <ReportCard
            title="Revenue"
            value="1000$"
            iconName="cash"
            backgroundColor="yellow"
            style={{ width: "48%" }}
          />
        </GridView>
        <ChartSection
          data={donutChartData}
          onRefresh={handleGenerateData}
          style={{ marginBottom: 16 }}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
});
