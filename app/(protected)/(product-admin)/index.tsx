import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FontAwesome5 } from "@expo/vector-icons";
export default function AdminProductScreen() {
  const router = useRouter();
  const iconColor = useThemeColor({}, "icon");
  const iconBoundingColor = useThemeColor({}, "iconBounding");
  const borderColor = useThemeColor({}, "border");
  const handleClick = (key: string) => () => {
    if (key === "book") {
      router.push("/(protected)/(product-admin)/(book-management)");
    } else if (key === "book-title") {
      router.push("/(protected)/(product-admin)/(book-title)");
    } else if (key === "book-position") {
      router.push("/(protected)/(product-admin)/(book-position)");
    } else if (key === "category") {
      router.push("/(protected)/(product-admin)/(category)");
    } else if (key === "author") {
      router.push("/(protected)/(product-admin)/(author)");
    } else if (key === "publisher") {
      router.push("/(protected)/(product-admin)/(publisher)");
    } else if (key === "warehouse") {
      console.log("Warehouse Management clicked");
    } else if (key === "customer") {
      router.push("/(protected)/(product-admin)/(customer)");
    }
  };
  const menuItems = [
    {
      id: "book",
      title: "Books Management",
      icon: <FontAwesome name="book" size={24} color={iconColor} />,
      onPress: handleClick("book"),
    },
    {
      id: "book-title",
      title: "Book Titles Management",
      icon: <FontAwesome6 name="book-bookmark" size={24} color={iconColor} />,
      onPress: handleClick("book-title"),
    },
    {
      id: "book-position",
      title: "Book Positions Management",
      icon: <FontAwesome5 name="search-location" size={24} color={iconColor} />,
      onPress: handleClick("book-position"),
    },
    {
      id: "category",
      title: "Categories Management",
      icon: <MaterialIcons name="category" size={24} color={iconColor} />,
      onPress: handleClick("category"),
    },
    {
      id: "author",
      title: "Author Management",
      icon: (
        <MaterialCommunityIcons
          name="badge-account"
          size={24}
          color={iconColor}
        />
      ),
      onPress: handleClick("author"),
    },
    {
      id: "publisher",
      title: "Publisher Management",
      icon: <Entypo name="publish" size={24} color={iconColor} />,
      onPress: handleClick("publisher"),
    },
    {
      id: "warehouse",
      title: "Warehouse Management",
      icon: <MaterialIcons name="warehouse" size={24} color={iconColor} />,
      onPress: handleClick("warehouse"),
    },
    {
      id: "customer",
      title: "Customer Management",
      icon: <FontAwesome5 name="user-friends" size={24} color={iconColor} />,
      onPress: handleClick("customer"),
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      flex: 1,
      paddingBottom: 20,
    },
    menuContainer: {
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: iconBoundingColor,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    menuItemText: {
      fontSize: 18,
      fontWeight: "600",
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <Stack
        screenOptions={{
          presentation: "transparentModal",
          navigationBarHidden: true,
        }}
      ></Stack>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={item.onPress}
              >
                <View style={styles.iconContainer}>{item.icon}</View>
                <ThemedText style={styles.menuItemText}>
                  {item.title}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}
