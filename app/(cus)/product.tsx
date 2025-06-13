import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
export default function AdminProductScreen() {
  const router = useRouter();
  const iconColor = useThemeColor({}, "icon");
  const iconBoundingColor = useThemeColor({}, "iconBounding");
  const borderColor = useThemeColor({}, "border");
  const handleClick = (key: string) => () => {
    switch (key) {
      case "book":
        // router.push("/(admin)/(product)/book-management");
        break;
      case "category":
        console.log("Category Management clicked");
        break;
      case "author":
        console.log("Author Management clicked");
        break;
      case "publisher":
        console.log("Publisher Management clicked");
        break;
      case "warehouse":
        console.log("Warehouse Management clicked");
        break;
      default:
        break;
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
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
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
              <ThemedText style={styles.menuItemText}>{item.title}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
