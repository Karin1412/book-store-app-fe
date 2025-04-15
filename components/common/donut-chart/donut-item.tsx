import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { DonutChartDataItem } from "./donut-chart";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  item: DonutChartDataItem;
  index: number;
};

const DonutItem = ({ item, index }: Props) => {
  const { width } = useWindowDimensions();
  const textColor = useThemeColor({}, "text");

  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    contentContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 20,
      gap: 10,
    },
    color: {
      width: 12,
      height: 12,
      borderRadius: "50%",
    },
    normalText: {
      fontSize: 20,
      fontWeight: "medium",
      color: textColor,
    },
    strongText: {
      fontSize: 20,
      fontWeight: "bold",
      color: textColor,
    },
  });
  return (
    <Animated.View
      style={[styles.container, { width: width * 0.9 }]}
      entering={FadeInDown.delay(index * 200)}
      exiting={FadeOutDown}
    >
      <View style={styles.contentContainer}>
        <View style={[styles.color, { backgroundColor: item.color }]} />
        <Text style={styles.normalText}>
          {`${item.label}: ${item.percentage}% `}
          <Text style={styles.strongText}>{`($${item.value})`}</Text>
        </Text>
      </View>
    </Animated.View>
  );
};

export default DonutItem;
