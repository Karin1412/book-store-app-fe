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
        {/* Book management */}
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
          name="(book-management)/[id]/edit"
          options={{
            headerTitle: "Edit book",
          }}
        />
        <Stack.Screen
          name="(book-management)/[id]/details"
          options={{
            headerTitle: "Book details",
          }}
        />

        {/* Book title management */}
        <Stack.Screen
          name="(book-title)/index"
          options={{
            headerTitle: "Book title management",
          }}
        />
        <Stack.Screen
          name="(book-title)/new-book-title"
          options={{
            headerTitle: "Add a new book title",
          }}
        />
        <Stack.Screen
          name="(book-title)/[id]/edit"
          options={{
            headerTitle: "Edit book title",
          }}
        />
        <Stack.Screen
          name="(book-title)/[id]/details"
          options={{
            headerTitle: "Book title details",
          }}
        />

        {/* Category management */}
        <Stack.Screen
          name="(category)/index"
          options={{
            headerTitle: "Category management",
          }}
        />
        <Stack.Screen
          name="(category)/new-category"
          options={{
            headerTitle: "Add a new category",
          }}
        />
        <Stack.Screen
          name="(category)/[id]/edit"
          options={{
            headerTitle: "Edit category",
          }}
        />

        {/* Author management */}
        <Stack.Screen
          name="(author)/index"
          options={{
            headerTitle: "Author management",
          }}
        />
        <Stack.Screen
          name="(author)/new-author"
          options={{
            headerTitle: "Add a new author",
          }}
        />
        <Stack.Screen
          name="(author)/[id]/edit"
          options={{
            headerTitle: "Edit author",
          }}
        />

        {/* Publisher management */}
        <Stack.Screen
          name="(publisher)/index"
          options={{
            headerTitle: "Publisher management",
          }}
        />
        <Stack.Screen
          name="(publisher)/new-publisher"
          options={{
            headerTitle: "Add a new publisher",
          }}
        />
        <Stack.Screen
          name="(publisher)/[id]/edit"
          options={{
            headerTitle: "Edit publisher",
          }}
        />

        {/* Customer management */}
        <Stack.Screen
          name="(customer)/index"
          options={{
            headerTitle: "Customer management",
          }}
        />
        <Stack.Screen
          name="(customer)/new-customer"
          options={{
            headerTitle: "Add a new customer",
          }}
        />
        <Stack.Screen
          name="(customer)/[id]/edit"
          options={{
            headerTitle: "Edit customer",
          }}
        />
      </Stack>
    </>
  );
}
