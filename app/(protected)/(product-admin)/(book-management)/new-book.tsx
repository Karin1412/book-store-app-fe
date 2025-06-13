import BookDetailForm from "@/components/features/admin/product/book-management/book-detail-form";
import { ThemedView } from "@/components/ThemedView";
import { Book } from "@/types/book";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function NewBookScreen() {
  const handleSubmit = async (book: Book) => {
    console.log("Book submitted:", book);
    // Implement the submit functionality here
  };
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <BookDetailForm
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
