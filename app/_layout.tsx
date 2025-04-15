import AuthProvider from "@/providers/auth-provider";
import { Slot } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <Slot />
        <Toast />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
