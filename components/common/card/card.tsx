import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type TouchableOpacityProps = React.ComponentProps<typeof TouchableOpacity>;
type Props = {} & TouchableOpacityProps;

export default function Card({ style, children, ...props }: Props) {
  return (
    <TouchableOpacity style={[styles.card, style]} {...props}>
      {children}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
});
