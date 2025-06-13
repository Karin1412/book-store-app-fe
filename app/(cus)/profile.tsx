import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";
import { mockUsers } from "@/mocks/user";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { GetProfile } from "@/services/auth";
import { User } from "@/types/user";

export default function ProfileScreen() {
  // Tạm dùng user đầu tiên (id: 1) làm user đang đăng nhập

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const defaultImage =
    currentUser?.role === "admin"
      ? require("@/assets/images/default-admin-image.png")
      : require("@/assets/images/default-user-image.jpg");

  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const avatarBorder = useThemeColor({}, "tint");

  useFocusEffect(
    useCallback(() => {
      const fetchCategories = async () => {
        await GetProfile().then(setCurrentUser);
      };
      fetchCategories();
    }, [])
  );

  if (!currentUser) return null;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarWrapper}>
          <Image
            source={currentUser.imgUrl || defaultImage}
            style={[styles.avatar, { borderColor: avatarBorder }]}
          />
        </View>

        <Text style={[styles.name, { color: textColor }]}>
          {currentUser.name}
        </Text>
        <Text style={[styles.email, { color: textColor }]}>
          {currentUser.email}
        </Text>

        <View style={[styles.infoBox, { borderColor }]}>
          <Text style={[styles.label, { color: textColor }]}>
            Số điện thoại:
          </Text>
          <Text style={[styles.value, { color: textColor }]}>
            {currentUser.phone}
          </Text>

          <Text style={[styles.label, { color: textColor }]}>Địa chỉ:</Text>
          <Text style={[styles.value, { color: textColor }]}>
            {currentUser.address}
          </Text>

          <Text style={[styles.label, { color: textColor }]}>Vai trò:</Text>
          <Text style={[styles.value, { color: textColor }]}>
            {currentUser.role}
          </Text>

          <Text style={[styles.label, { color: textColor }]}>Trạng thái:</Text>
          <Text
            style={[
              styles.value,
              { color: currentUser.isActive ? "green" : "red" },
            ]}
          >
            {currentUser.isActive ? "Hoạt động" : "Ngừng hoạt động"}
          </Text>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 50,
    borderWidth: 3,
    marginBottom: 8,
  },
  changeAvatarButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  changeAvatarText: {
    fontSize: 13,
    color: "#007bff",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  infoBox: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
  },
  value: {
    marginTop: 2,
    marginBottom: 4,
  },
});
