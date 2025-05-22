import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCodeOverlay from "./qr-code-overlay";
import LoadingScreen from "./qr-code-loading";

interface Props {
  onScanned?: (result: BarcodeScanningResult) => void;
  onRequestPermissionFail?: () => void;
  onClose?: () => void;
  waitForScanTimeout?: number;
}

export default function QRCodeCamera({
  onScanned,
  onRequestPermissionFail,
  onClose,
  waitForScanTimeout = 1000,
}: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = permission?.granted;
  const [flashOn, setFlashOn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const qrLock = React.useRef(false);

  const handleRequestPermission = async () => {
    if (!isPermissionGranted) {
      const { status } = await requestPermission();
      if (status !== "granted") {
        resetState();
        if (onRequestPermissionFail) onRequestPermissionFail();
      }
    }
  };

  const handleQRCodeScanned = (result: BarcodeScanningResult) => {
    if (qrLock.current) return;
    qrLock.current = true;
    setIsLoading(true);

    setTimeout(() => {
      if (onScanned) onScanned(result);
    }, waitForScanTimeout);

    setTimeout(() => {
      resetState();
    }, waitForScanTimeout + 1000);
  };

  const handleClose = () => {
    resetState();
    if (onClose) onClose();
  };

  const resetState = () => {
    qrLock.current = false;
    setIsLoading(false);
    if (flashOn) setFlashOn(false);
  };

  const toggleFlash = () => setFlashOn((prev) => !prev);

  useEffect(() => {
    handleRequestPermission();
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleQRCodeScanned}
        enableTorch={flashOn}
      ></CameraView>

      {isLoading ? (
        <LoadingScreen progressDuration={waitForScanTimeout} />
      ) : (
        <QRCodeOverlay
          flashOn={flashOn}
          onClose={handleClose}
          onFlashToggle={toggleFlash}
        />
      )}
    </SafeAreaView>
  );
}
