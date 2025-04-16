import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

type TextInputProps = React.ComponentProps<typeof TextInput>;

type Props = {} & TextInputProps;

export default function SearchInput({ placeholder, ...props }: Props) {
  const iconColor = useThemeColor({}, "icon");
  const backgroundSecondaryColor = useThemeColor({}, "backgroundSecondary");
  const textSecondaryColor = useThemeColor({}, "textSecondary");

  const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: backgroundSecondaryColor,
      borderRadius: 10,
      paddingHorizontal: 16,
    },
    searchInput: {
      flex: 1,
      height: 44,
      fontSize: 16,
    },
    searchIcon: {},
    content: {
      flex: 1,
    },
  });
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder ?? "Search..."}
        placeholderTextColor={textSecondaryColor}
        {...props}
      />
      <Ionicons
        name="search"
        size={20}
        color={iconColor}
        style={styles.searchIcon}
      />
    </View>
  );
}
