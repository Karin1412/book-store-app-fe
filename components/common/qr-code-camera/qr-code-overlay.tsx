// components/QRScannerOverlay.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  flashOn: boolean;
  onClose?: () => void;
  onFlashToggle?: () => void;
}

export default function QRCodeOverlay({
  flashOn = false,
  onClose,
  onFlashToggle,
}: Props) {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View style={styles.scanFrame}>
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, flashOn && styles.flashOn]}
          onPress={onFlashToggle}
        >
          <Ionicons
            name={flashOn ? "flashlight" : "flashlight-outline"}
            size={24}
            color={flashOn ? "rgba(52, 52, 52, 0.8)" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scanFrame: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cornerTopLeft: {
    position: "absolute",
    top: "30%",
    left: "20%",
    width: 50,
    height: 50,
    borderTopWidth: 6,
    borderLeftWidth: 6,
    borderColor: "white",
    borderTopLeftRadius: 25,
  },
  cornerTopRight: {
    position: "absolute",
    top: "30%",
    right: "20%",
    width: 50,
    height: 50,
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderColor: "white",
    borderTopRightRadius: 25,
  },
  cornerBottomLeft: {
    position: "absolute",
    bottom: "40%",
    left: "20%",
    width: 50,
    height: 50,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderColor: "white",
    borderBottomLeftRadius: 25,
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: "40%",
    right: "20%",
    width: 50,
    height: 50,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderColor: "white",
    borderBottomRightRadius: 25,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 150,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 80,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  flashOn: {
    backgroundColor: "white",
  },
});
