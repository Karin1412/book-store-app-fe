import BookDetailForm from "@/components/features/admin/product/book-management/book-detail-form";
import { ThemedView } from "@/components/ThemedView";
import { mockBooks } from "@/mocks/book";
import { GetAllBooks, UpdateBook } from "@/services/book";
import { Book } from "@/types/book";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type Params = {
  id: string;
};

export default function BookEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [book, setBook] = React.useState<Book | null>(null);
  const [books, setBooks] = React.useState<Book[]>(mockBooks);

  const fetchBookData = async (id: string) => {
    const res = books.find((book) => book.id === id);
    if (res) setBook(res);
  };

  useEffect(() => {
    if (id) fetchBookData(id);
  }, [id, books]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await GetAllBooks().then(setBooks);
      };
      fetchData();
    }, [])
  );

  const handleSubmit = async (book: Book) => {
    console.log("Book submitted:", book);
    await UpdateBook(book.id, book)
      .then(() => {
        router.back();
      })
      .catch((error) => {
        console.error("Error updating book:", error.log);
      });
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
