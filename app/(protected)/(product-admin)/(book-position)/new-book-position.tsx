import BookPositionDetailForm from "@/components/features/admin/product/book-position-management/book-position-form";
import { ThemedView } from "@/components/ThemedView";
import { BookPosition } from "@/types/book";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function NewBookPositionScreen() {
  const router = useRouter();
  const handleSubmit = async (bookPosition: BookPosition) => {
    console.log("Book title submitted:", bookPosition);
    // Implement the submit functionality here
    router.back();
  };
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <BookPositionDetailForm
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
