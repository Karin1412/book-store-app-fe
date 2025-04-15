// app/(tabs)/_layout.tsx
import { useAuth } from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IonIconMap } from "@/types/ionicon";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";

export default function AdminLayout() {
  const { user } = useAuth();
  const theme = useColorScheme() ?? "light";
  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");
  return (
    <>
      <StatusBar
        style={theme === "light" ? "dark" : "light"}
        backgroundColor={backgroundColor}
      />
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: IonIconMap = "home";

            if (route.name === "index") {
              iconName = "home";
            } else if (route.name === "product") {
              iconName = "cube-sharp";
            } else if (route.name === "cart") {
              iconName = "cart";
            } else if (route.name === "profile") {
              iconName = "person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#708cff",
          tabBarInactiveTintColor: tintColor,
          tabBarStyle: {
            backgroundColor,
          },
          headerTintColor: tintColor,
          headerStyle: {
            backgroundColor,
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            headerTitle: `Welcome back, ${user?.name}!!`,
          }}
        />
        <Tabs.Screen name="product" options={{ tabBarLabel: "Product" }} />
        <Tabs.Screen name="cart" options={{ tabBarLabel: "Cart" }} />
        <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
      </Tabs>
    </>
  );
}
