// app/(tabs)/_layout.tsx
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";

export default function AdminProductLayout() {
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
            headerTitle: "Product management",
          }}
        />
        <Stack.Screen
          name="(book-management)/index"
          options={{
            headerTitle: "Book management",
          }}
        />
        <Stack.Screen
          name="(book-management)/new-book"
          options={{
            headerTitle: "Add a new book",
          }}
        />
        <Stack.Screen
          name="(book-management)/[id]"
          options={{
            headerTitle: "Edit book",
          }}
        />
      </Stack>
    </>
  );
}
