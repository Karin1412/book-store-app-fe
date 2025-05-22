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
            } else if (route.name === "(product)") {
              iconName = "cube-sharp";
            } else if (route.name === "(cart)") {
              iconName = "cart";
            } else if (route.name === "profile") {
              iconName = "person";
            } else if (route.name === "(customer)") {
              iconName = "people";
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
          name="(product)"
          options={{
            headerShown: false,
            tabBarLabel: "Product",
          }}
        />
        <Tabs.Screen
          name="(cart)"
          options={{
            headerShown: false,
            tabBarLabel: "Cart",
          }}
        />
        <Tabs.Screen
          name="(customer)"
          options={{ headerShown: false, tabBarLabel: "Customer" }}
        />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        <Tabs.Screen
          name="scan-qr-code"
          options={{
            headerShown: false,
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
      </Tabs>
    </>
  );
}
