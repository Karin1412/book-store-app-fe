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
  const tabIconDefault = useThemeColor({}, "tabIconDefault");
  const tabIconSelected = useThemeColor({}, "tabIconSelected");
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
            } else if (route.name === "search") {
              iconName = "search";
            } else if (route.name === "cart") {
              iconName = "cart";
            } else if (route.name === "profile") {
              iconName = "person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: tabIconSelected,
          tabBarInactiveTintColor: tabIconDefault,
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
        <Tabs.Screen
          name="search"
          options={{
            tabBarLabel: "Search",
            headerTitle: "Search",
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{ tabBarLabel: "Cart", headerTitle: "Borrowed books" }}
        />
        <Tabs.Screen
          name="profile"
          options={{ tabBarLabel: "Profile", headerTitle: "Profile" }}
        />
        <Tabs.Screen
          name="(book)/[id]"
          options={{
            headerShown: false,
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}
