import React from "react";
import { StyleSheet, View } from "react-native";

type ViewProps = React.ComponentProps<typeof View>;
type Props = {} & ViewProps;

export default function GridView({ style, children, ...props }: Props) {
  return (
    <View style={[styles.gridContainer, style]} {...props}>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
