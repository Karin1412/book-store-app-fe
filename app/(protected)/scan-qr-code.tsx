import QRCodeCamera from "@/components/common/qr-code-camera/qr-code-camera";
import { ThemedView } from "@/components/ThemedView";
import { showErrorMessage } from "@/libs/react-native-toast-message/toast";
import { BarcodeScanningResult } from "expo-camera";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

export default function ScanQRCodeScreen() {
  const router = useRouter();

  const handleRequestPermissionFail = () => {
    showErrorMessage(
      "Camera permission is required to scan QR codes. Please enable it in your device settings."
    );
    router.push("/(protected)/(product-admin)/(book-position)");
  };

  const handleQRCodeScanned = (result: BarcodeScanningResult) => {
    const { data } = result;
    if (!data) return;
    console.log("QR Code Data:", data);
    router.push(`/(protected)/(product-admin)/(book-position)/${2}/details`);
  };

  const handleClose = () => {
    router.push("/(protected)/(product-admin)/(book-position)");
  };

  return (
    <ThemedView style={StyleSheet.absoluteFillObject}>
      <StatusBar translucent />
      <QRCodeCamera
        onRequestPermissionFail={handleRequestPermissionFail}
        onScanned={handleQRCodeScanned}
        onClose={handleClose}
      />
    </ThemedView>
  );
}
