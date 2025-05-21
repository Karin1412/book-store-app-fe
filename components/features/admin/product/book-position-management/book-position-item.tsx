import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BookPosition, BookTitle } from "@/types/book";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  bookPosition: BookPosition;
  onGotoDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function BookPositionItem({
  bookPosition,
  onEdit,
  onDelete,
  onGotoDetails,
}: Props) {
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const handleGotoDetails = () => {
    if (onGotoDetails) onGotoDetails(bookPosition.id);
  };
  const handleEdit = () => {
    if (onEdit) onEdit(bookPosition.id);
  };
  const handleDelete = () => {
    if (onDelete) onDelete(bookPosition.id);
  };

  const styles = StyleSheet.create({
    bookItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    bookCover: {
      width: 50,
      height: 70,
      borderRadius: 4,
      backgroundColor: "#e0e0e0",
    },
    bookInfo: {
      flex: 1,
      marginLeft: 15,
    },
    bookTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: tintColor,
    },
    bookActions: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionButton: {
      padding: 8,
      marginLeft: 5,
    },
  });
  return (
    <View style={styles.bookItem}>
      <View style={styles.bookInfo}>
        <ThemedText
          style={styles.bookTitle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {bookPosition.bookTitle.name}
        </ThemedText>
      </View>
      <View style={styles.bookActions}>
        <TouchableOpacity
          onPress={handleGotoDetails}
          style={styles.actionButton}
        >
          <Ionicons name="eye" size={20} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
          <Ionicons name="pencil" size={20} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
          <Ionicons name="trash" size={20} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
