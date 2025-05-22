import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { mockBookTitles } from "@/mocks/book-title";
import { BookTitle } from "@/types/book";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Params = {
  id: string;
};

export default function BookTitleDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [bookTitle, setBookTitle] = React.useState<BookTitle | null>(null);
  const textSecondaryColor = useThemeColor({}, "textSecondary");
  const iconColor = useThemeColor({}, "icon");

  const fetchData = async (id: string) => {
    const res = mockBookTitles.find((book) => book.id === id);
    if (res) setBookTitle(res);
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const handleEdit = () => {
    router.push(`/(admin)/(product)/(book-management)/book-title/${id}/edit`);
  };

  const handleDelete = () => {
    if (!bookTitle) return;
    // Implement delete functionality here
    console.log("Delete book title with id:", bookTitle.id);
  };

  const handleSubmit = async (bookTitle: BookTitle) => {
    console.log("Book title submitted:", bookTitle);
    // Implement the submit functionality here
  };

  if (!bookTitle) return null; // Handle loading state or error state

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      padding: 24,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    spacer: {
      flex: 1,
    },
    headerButtons: {
      flexDirection: "row",
    },
    iconButton: {
      padding: 8,
      marginLeft: 16,
    },
    detailRow: {
      flexDirection: "row",
      marginBottom: 24,
      alignItems: "flex-start",
      gap: 32,
    },
    label: {
      width: 100,
      fontSize: 16,
      fontWeight: "bold",
    },
    value: {
      flex: 1,
      fontSize: 16,
      color: textSecondaryColor,
    },
  });
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <View style={styles.spacer} />
            <View style={styles.headerButtons}>
              <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
                <Feather name="edit-2" size={20} color={iconColor} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.iconButton}
              >
                <Feather name="trash-2" size={20} color={iconColor} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Title</ThemedText>
            <Text style={styles.value}>{bookTitle.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Category</ThemedText>
            <Text style={styles.value}>{bookTitle.category.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Author</ThemedText>
            <Text style={styles.value}>{bookTitle.author.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Description</ThemedText>
            <Text style={styles.value}>{bookTitle.description}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
