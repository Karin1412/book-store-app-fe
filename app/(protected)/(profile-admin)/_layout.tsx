// app/(tabs)/_layout.tsx
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";

export default function AdminCartLayout() {
  const theme = useColorScheme() ?? "light";
  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");
  return (
    <>
      <StatusBar
        style={theme === "light" ? "dark" : "light"}
        backgroundColor={backgroundColor}
      />
      <Stack
        screenOptions={{
          headerTintColor: tintColor,
          headerStyle: {
            backgroundColor,
          },
          contentStyle: {
            backgroundColor,
          },
          presentation: "transparentModal",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Profile settings",
          }}
        />
        <Stack.Screen
          name="[id]/edit"
          options={{
            headerTitle: "Edit profile",
          }}
        />
      </Stack>
    </>
  );
}
