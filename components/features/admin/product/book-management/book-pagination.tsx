import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  totalPages: number;
  activePage: number;
  setActivePage: (page: number) => void;
}

export default function BookPagination({
  totalPages,
  activePage,
  setActivePage,
}: Props) {
  const iconBoundingColor = useThemeColor({}, "iconBounding");
  const tintColor = useThemeColor({}, "tint");
  const textSecondaryColor = useThemeColor({}, "textSecondary");

  const styles = StyleSheet.create({
    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      paddingVertical: 20,
    },
    pageButton: {
      width: 30,
      height: 30,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 5,
    },
    activePageButton: {
      backgroundColor: iconBoundingColor,
    },
    pageButtonText: {
      fontSize: 16,
      color: textSecondaryColor,
    },
    activePageButtonText: {
      color: tintColor,
    },
  });
  return (
    <View style={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <TouchableOpacity
          key={page}
          style={[
            styles.pageButton,
            activePage === page && styles.activePageButton,
          ]}
          onPress={() => setActivePage(page)}
        >
          <Text
            style={[
              styles.pageButtonText,
              activePage === page && styles.activePageButtonText,
            ]}
          >
            {page}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
