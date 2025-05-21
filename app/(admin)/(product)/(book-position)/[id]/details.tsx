import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { mockBookTitles } from "@/mocks/book-title";
import { mockBookPositions } from "@/mocks/bookPosition";
import { BookPosition, BookTitle } from "@/types/book";
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

export default function BookPositionDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [bookPosition, setBookPosition] = React.useState<BookPosition | null>(
    null
  );
  const textSecondaryColor = useThemeColor({}, "textSecondary");

  const fetchData = async (id: string) => {
    const res = mockBookPositions.find((pos) => pos.id === id);
    if (res) setBookPosition(res);
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const handleEdit = () => {
    router.push(`/(admin)/(product)/(book-position)/${id}/edit`);
  };

  const handleDelete = () => {
    if (!bookPosition) return;
    // Implement delete functionality here
    console.log("Delete book title with id:", bookPosition.id);
    router.back();
  };

  const handleSubmit = async (bookPosition: BookPosition) => {
    console.log("Book title submitted:", bookPosition);
    // Implement the submit functionality here
  };

  if (!bookPosition) return null; // Handle loading state or error state

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
                <Feather name="edit-2" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.iconButton}
              >
                <Feather name="trash-2" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Book title</ThemedText>
            <Text style={styles.value}>{bookPosition.bookTitle.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Zone</ThemedText>
            <Text style={styles.value}>{bookPosition.zone}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Shelf</ThemedText>
            <Text style={styles.value}>{bookPosition.shelf}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Row</ThemedText>
            <Text style={styles.value}>{bookPosition.row}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Note</ThemedText>
            <Text style={styles.value}>{bookPosition.note}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
