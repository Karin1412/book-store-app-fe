import Card from "@/components/common/card/card";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { IonIconMap } from "@/types/ionicon";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const colorMap: Record<string, string> = {
  red: "#f6645a",
  yellow: "#f3da00",
  green: "#4CAF50",
  blue: "#39b3cc",
  orange: "#FF9800",
  purple: "#9C27B0",
  gray: "#9E9E9E",
  white: "#FFFFFF",
  black: "#000000",
};

type CardProps = React.ComponentProps<typeof Card>;
type Props = {
  title: string;
  value: string;
  iconName: IonIconMap;
  backgroundColor?: keyof typeof colorMap;
} & CardProps;

export default function ReportCard({
  backgroundColor,
  iconName,
  title,
  value,
  style,
  ...props
}: Props) {
  const theme = useColorScheme();

  return (
    <Card
      style={[
        backgroundColor && { backgroundColor: colorMap[backgroundColor] },
        theme === "dark" &&
          backgroundColor && {
            boxShadow: `0 4px 8px ${colorMap[backgroundColor]}80`,
          },
        style,
      ]}
      {...props}
    >
      <View style={styles.heading}>
        <Ionicons name={iconName} size={24} color="#ffffff" />
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
});
