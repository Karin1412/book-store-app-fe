import { useThemeColor } from "@/hooks/useThemeColor";
import { Canvas, Path, SkFont, Skia, Text } from "@shopify/react-native-skia";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  DerivedValue,
  SharedValue,
  useDerivedValue,
} from "react-native-reanimated";
import DonutPath from "./donut-path";

export interface DonutChartDataItem {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

export interface DonutChartData {
  items: DonutChartDataItem[];
}

type Props = {
  numberItems: number;
  gap: number;
  radius: number;
  strokeWidth: number;
  outerStrokeWidth: number;
  decimals: SharedValue<number[]>;
  colors: string[];
  totalValue: SharedValue<number>;
  font: SkFont;
  smallFont: SkFont;
  title: string;
};

const DonutChart = ({
  numberItems,
  gap,
  decimals,
  colors,
  totalValue,
  strokeWidth,
  outerStrokeWidth,
  radius,
  font,
  smallFont,
  title,
}: Props) => {
  const textColor = useThemeColor({}, "text");
  const array = Array.from({ length: numberItems });
  const innerRadius = radius - outerStrokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const targetText = useDerivedValue(
    () => `$${Math.round(totalValue.value)}`,
    []
  );

  function getCenteredTextX(
    text: DerivedValue<string> | string,
    font: SkFont,
    centerX: number
  ) {
    if (typeof text === "string") {
      return centerX - font.measureText(text).width / 2;
    }
    return useDerivedValue(() => {
      const fontSize = font.measureText(text.value);
      return centerX - fontSize.width / 2;
    }, []);
  }

  function getCenteredTextY(text: string, font: SkFont, centerY: number) {
    return useDerivedValue(() => {
      const fontSize = font.measureText(text);
      return centerY + fontSize.height / 2;
    }, []);
  }

  const titleXPosition = getCenteredTextX(title, smallFont, radius);
  const titleYPosition = getCenteredTextY(title, smallFont, radius - 15);
  const totalValueYPosition = getCenteredTextY(
    targetText.get(),
    font,
    radius + 15
  );

  const totalValueXPosition = getCenteredTextX(targetText, font, radius);
  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color="#f4f7fc"
          style="stroke"
          strokeJoin="round"
          strokeWidth={outerStrokeWidth}
          strokeCap="round"
          start={0}
          end={1}
        />

        {array.map((_, index) => {
          return (
            <DonutPath
              key={index}
              radius={radius}
              strokeWidth={strokeWidth}
              outerStrokeWidth={outerStrokeWidth}
              color={colors[index]}
              decimals={decimals}
              index={index}
              gap={gap}
            />
          );
        })}

        <Text
          x={titleXPosition}
          y={titleYPosition}
          text={title}
          font={smallFont}
          color={textColor}
        />

        <Text
          x={totalValueXPosition}
          y={totalValueYPosition}
          text={targetText}
          font={font}
          color={textColor}
        />
      </Canvas>
    </View>
  );
};

export default DonutChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
