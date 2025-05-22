import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Props {
  message?: string;
  progressDuration?: number;
}

const LoadingScreen = ({
  message = "Loading...",
  progressDuration = 2000,
}: Props) => {
  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: width, // Full width minus padding
      duration: progressDuration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: backgroundColor,
      padding: 20,
    },
    loadingText: {
      fontSize: 18,
      color: "#ffffff",
      marginBottom: 30,
      fontWeight: "500",
    },
    progressContainer: {
      width: "100%",
      height: 6,
      backgroundColor: backgroundColor,
      borderRadius: 3,
      overflow: "hidden",
    },
    progressBar: {
      height: "100%",
      backgroundColor: tintColor,
      borderRadius: 3,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator color={tintColor} />

      <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
        {message}
      </Animated.Text>

      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width: progressAnim }]} />
      </View>
    </View>
  );
};

export default LoadingScreen;
