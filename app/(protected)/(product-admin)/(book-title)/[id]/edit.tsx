import BookTitleDetailForm from "@/components/features/admin/product/book-title-management/book-title-form";
import { ThemedView } from "@/components/ThemedView";
import { mockBookTitles } from "@/mocks/book-title";
import { BookTitle } from "@/types/book";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type Params = {
  id: string;
};

export default function BookTitleEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [bookTitle, setBookTitle] = React.useState<BookTitle | null>(null);

  const fetchData = async (id: string) => {
    const res = mockBookTitles.find((bookTitle) => bookTitle.id === id);
    if (res) setBookTitle(res);
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const handleSubmit = async (bookTitle: BookTitle) => {
    console.log("Book submitted:", bookTitle);
    // Implement the submit functionality here
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <BookTitleDetailForm
            bookTitle={bookTitle}
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
