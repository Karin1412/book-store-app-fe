import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  icon: any;
  label: string;
  onPress?: () => void;
}

export default function AvatarOption({ icon, label, onPress }: Props) {
  const textColor = useThemeColor({}, "text");
  const iconBoundingColor = useThemeColor({}, "iconBounding");

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
    },
    icon: {
      width: 48,
      height: 48,
      padding: 10,
      marginRight: 16,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      backgroundColor: iconBoundingColor,
    },
    label: {
      fontSize: 16,
      color: textColor,
    },
  });
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
