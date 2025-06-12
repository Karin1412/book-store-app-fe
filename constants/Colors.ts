/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#ffffff";
const iconColorLight = "#687076";
const iconColorDark = "#9BA1A6";

export const APP_COLOR = {
  light: {
    text: "#11181C",
    textSecondary: "#5F6C7B",
    background: "#ffffff",
    backgroundSecondary: "#F4F7FC",
    tint: tintColorLight,
    icon: iconColorLight,
    iconBounding: "#e5e9f1",
    tabIconDefault: iconColorLight,
    tabIconSelected: tintColorLight,
    border: "#2D2F31",
    green: "#4CAF50",
    red: "#F44336",
    shadow: "rgba(0, 0, 0, 0.5)",
  },
  dark: {
    text: "#ECEDEE",
    textSecondary: "#A0A4A8",
    background: "#151718",
    backgroundSecondary: "#1E2022",
    tint: tintColorDark,
    icon: iconColorDark,
    iconBounding: "#2D2F31",
    tabIconDefault: iconColorDark,
    tabIconSelected: tintColorDark,
    border: "#E0E0E0",
    green: "#4CAF50",
    red: "#F44336",
    shadow: "rgba(255, 255, 255, 0.4)",
  },
};
