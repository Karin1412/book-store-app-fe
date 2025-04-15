import { DonutChartData } from "@/components/common/donut-chart/donut-chart";
import DonutChartContainer from "@/components/common/donut-chart/donut-chart-screen";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

interface Props {
  data?: DonutChartData;
  onRefresh?: () => void;
  style?: ViewStyle;
}

export default function ChartSection({ data, onRefresh, style }: Props) {
  const iconColor = useThemeColor({}, "icon");

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Order status</ThemedText>
        <TouchableOpacity onPress={onRefresh}>
          <Ionicons name="reload" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>
      <DonutChartContainer data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
