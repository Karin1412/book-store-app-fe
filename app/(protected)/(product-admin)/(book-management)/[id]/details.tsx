import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { mockBooks } from "@/mocks/book";
import { Book } from "@/types/book";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
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

export default function BookDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [book, setBook] = React.useState<Book | null>(null);
  const iconColor = useThemeColor({}, "icon");
  const textSecondaryColor = useThemeColor({}, "textSecondary");
  const green = useThemeColor({}, "green");
  const red = useThemeColor({}, "red");

  const fetchBookData = async (id: string) => {
    const res = mockBooks.find((book) => book.id === id);
    if (res) setBook(res);
  };

  useEffect(() => {
    if (id) fetchBookData(id);
  }, [id]);

  const handleEditBook = () => {
    router.push(`/(protected)/(product-admin)/(book-management)/${id}/edit`);
  };

  const handleEditBookTitle = () => {
    router.push(
      `/(protected)/(product-admin)/(book-management)/book-title/${id}/edit`
    );
  };

  const handleDelete = () => {
    if (!book) return;
    // Implement delete functionality here
    console.log("Delete book with id:", book.id);
  };

  const handleSubmit = async (book: Book) => {
    console.log("Book submitted:", book);
    // Implement the submit functionality here
  };

  if (!book) return null; // Handle loading state or error state

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
    alignCenter: {
      alignItems: "center",
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
    available: {
      color: green,
    },
    unavailable: {
      color: red,
    },
    coverContainer: {
      width: 80,
      height: 120,
      borderRadius: 4,
      overflow: "hidden",
    },
    coverImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
  });
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <View style={styles.spacer} />
            <View style={styles.headerButtons}>
              <TouchableOpacity
                onPress={handleEditBook}
                style={styles.iconButton}
              >
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
            <ThemedText style={styles.label}>Cover Image</ThemedText>
            <View style={styles.coverContainer}>
              <>
                {book.imageUrl ? (
                  <Image
                    source={{ uri: book.imageUrl }}
                    style={styles.coverImage}
                  />
                ) : (
                  <FontAwesome name="book" size={24} color={iconColor} />
                )}
              </>
            </View>
          </View>

          <View style={[styles.detailRow, styles.alignCenter]}>
            <ThemedText style={styles.label}>Title</ThemedText>
            <Text style={styles.value}>{book.title.name}</Text>
            <TouchableOpacity
              onPress={handleEditBookTitle}
              style={styles.iconButton}
            >
              <Feather name="edit-2" size={20} color={iconColor} />
            </TouchableOpacity>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Quantity</ThemedText>
            <Text style={styles.value}>{book.quantity}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Reprint</ThemedText>
            <Text style={styles.value}>{book.reprint}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Publisher</ThemedText>
            <Text style={styles.value}>{book.publisher.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Listed price</ThemedText>
            <Text style={styles.value}>{book.listedPrice}$</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Unit price</ThemedText>
            <Text style={styles.value}>{book.unitPrice}$</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Status</ThemedText>
            <Text
              style={[
                styles.value,
                book.isActive ? styles.available : styles.unavailable,
              ]}
            >
              {book.isActive ? "Available" : "Unavailable"}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
