import { useAuth } from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Appearance,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Switch } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProfileScreen() {
  const router = useRouter();
  const { logout, user } = useAuth();
  const theme = useColorScheme() ?? "light";
  const backgroundColor = useThemeColor({}, "background");
  const backGroundSecondaryColor = useThemeColor({}, "backgroundSecondary");
  const textColor = useThemeColor({}, "text");
  const textColorSecondary = useThemeColor({}, "textSecondary");
  const shadowColor = useThemeColor({}, "shadow");
  const iconColor = useThemeColor({}, "icon");
  const defaultImage =
    user?.role === "admin"
      ? require("@/assets/images/default-admin-image.png")
      : require("@/assets/images/default-user-image.jpg");

  const toggleDarkMode = () => {
    Appearance.setColorScheme(theme === "dark" ? "light" : "dark");
  };

  const handleEditProfile = () => {
    if (!user) return;
    router.push(`/(admin)/(profile)/${user.id}/edit`);
  };

  if (!user) return null;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      alignItems: "center",
    },
    header: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    iconButton: {
      padding: 8,
      marginLeft: 16,
    },
    profileImageContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      position: "relative",
      paddingTop: 60,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: "#60A5FA",
      position: "absolute",
      top: 0,
      zIndex: 1,
      backgroundColor: "white",
    },
    card: {
      width: "100%",
      display: "flex",
      backgroundColor: backGroundSecondaryColor,
      borderRadius: 10,
      paddingTop: 56,
      paddingHorizontal: 24,
      paddingBottom: 32,
      marginBottom: 24,
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#F1F5F9",
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: textColor,
    },
    value: {
      fontSize: 16,
      color: textColorSecondary,
      fontWeight: "400",
    },
    darkModeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingVertical: 16,
      marginBottom: 40,
    },
    darkModeLabel: {
      fontSize: 18,
      fontWeight: "600",
      color: textColor,
    },
    switch: {
      transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
    },
    logoutButton: {
      backgroundColor: "#FB7185",
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 48,
      width: "60%",
      alignItems: "center",
      shadowColor: "#FB7185",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    logoutButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleEditProfile}
            style={styles.iconButton}
          >
            <Feather name="edit-2" size={20} color={iconColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileImageContainer}>
          <Image
            source={user.imgUrl || defaultImage}
            style={styles.profileImage}
          />

          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{user.name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Role</Text>
              <Text style={styles.value}>{user.role}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.value}>{user.phone}</Text>
            </View>
          </View>
        </View>

        {/* Dark Mode Toggle */}
        <View style={styles.darkModeContainer}>
          <Text style={styles.darkModeLabel}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#E5E7EB", true: "#60A5FA" }}
            thumbColor="white"
            ios_backgroundColor="#E5E7EB"
            onValueChange={toggleDarkMode}
            value={theme === "dark"}
            style={styles.switch}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={logout}
        >
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
