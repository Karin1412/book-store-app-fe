import AuthorDetailForm from "@/components/features/admin/product/author-management/author-form";
import { ThemedView } from "@/components/ThemedView";
import { CreateAuthor } from "@/services/author";
import { Author } from "@/types/author";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function NewAuthorScreen() {
  const router = useRouter();
  const handleSubmit = async (author: Author) => {
    console.log("Category submitted:", author);
    await CreateAuthor(author.name)
      .then(() => {
        router.back();
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
    router.back();
  };
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <AuthorDetailForm
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
