import BookTitleDetailForm from "@/components/features/admin/product/book-title-management/book-title-form";
import { ThemedView } from "@/components/ThemedView";
import { BookTitle } from "@/types/book";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function NewBookTitleScreen() {
  const router = useRouter();
  const handleSubmit = async (bookTitle: BookTitle) => {
    console.log("Book title submitted:", bookTitle);
    // Implement the submit functionality here
    router.back();
  };
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <BookTitleDetailForm
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
