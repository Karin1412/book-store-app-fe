import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Book, BookTitle } from "@/types/book";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  bookTitle: BookTitle;
  onGoToDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function BookTitleItem({
  bookTitle,
  onEdit,
  onDelete,
  onGoToDetails,
}: Props) {
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const handleEdit = () => {
    if (onEdit) onEdit(bookTitle.id);
  };
  const handleGoToDetails = () => {
    if (onGoToDetails) onGoToDetails(bookTitle.id);
  };
  const handleDelete = () => {
    if (onDelete) onDelete(bookTitle.id);
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
    bookAuthor: {
      fontSize: 14,
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
          {bookTitle.name}
        </ThemedText>
        <ThemedText
          style={styles.bookAuthor}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {bookTitle.author.name}
        </ThemedText>
      </View>
      <View style={styles.bookActions}>
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
