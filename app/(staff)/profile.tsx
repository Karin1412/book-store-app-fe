import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
export default function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.logout} onPress={logout}>
        Logout
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logout: {
    color: "#FF0000",
  },
});
