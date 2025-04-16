import BookDetailForm from "@/components/features/admin/product/book-detail/book-detail-form";
import { ThemedView } from "@/components/ThemedView";
import { mockBooks } from "@/mocks/book";
import { Book } from "@/types/book";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type Params = {
  id: string;
};

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<Params>();
  const [book, setBook] = React.useState<Book | null>(null);

  const fetchBookData = async (id: string) => {
    const res = mockBooks.find((book) => book.id === id);
    if (res) setBook(res);
  };

  useEffect(() => {
    if (id) fetchBookData(id);
  }, [id]);

  const handleSubmit = async (book: Book) => {
    console.log("Book submitted:", book);
    // Implement the submit functionality here
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <BookDetailForm
            book={book}
            style={{ paddingVertical: 20 }}
            onSubmit={handleSubmit}
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
